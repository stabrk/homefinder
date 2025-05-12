# routes/properties.py
from flask import Blueprint, request, jsonify
from models import Property, PropertyType
from db import db

properties_bp = Blueprint('properties_bp', __name__, url_prefix='/properties')

# Get all property types
@properties_bp.route('/types', methods=['GET'])
def get_property_types():
    property_types = PropertyType.query.all()
    result = [{
        'type_id': pt.type_id,
        'type_name': pt.type_name
    } for pt in property_types]
    return jsonify(result), 200

# Create initial property types (helper function)
def create_initial_property_types():
    if PropertyType.query.first() is None:
        initial_types = [
            PropertyType(type_name='House'),
            PropertyType(type_name='Apartment'),
            PropertyType(type_name='Condo'),
            PropertyType(type_name='Townhouse'),
            PropertyType(type_name='Land'),
            PropertyType(type_name='Commercial')
        ]
        db.session.bulk_save_objects(initial_types)
        db.session.commit()

# Create a property
@properties_bp.route('', methods=['POST'])
def create_property():
    data = request.json
    try:
        new_property = Property(
            title=data['title'],
            description=data.get('description'),
            price=data['price'],
            location=data['location'],
            num_bedrooms=data['num_bedrooms'],
            num_bathrooms=data['num_bathrooms'],
            num_garage=data['num_garage'],
            image_url=data.get('image_url'),
            user_id=data.get('user_id'),
            type_id=data.get('type_id')
        )
        db.session.add(new_property)
        db.session.commit()
        return jsonify({'message': 'Property created', 'property_id': new_property.property_id}), 201
    except KeyError as e:
        return jsonify({'error': f'Missing field: {str(e)}'}), 400

# get all properties with filters
@properties_bp.route('', methods=['GET'])
def get_properties():
    # get filter parameters from query string
    type_id = request.args.get('type_id', type=int)
    min_beds = request.args.get('min_beds', type=int)
    max_beds = request.args.get('max_beds', type=int)
    min_baths = request.args.get('min_baths', type=int)
    max_baths = request.args.get('max_baths', type=int)
    min_garage = request.args.get('min_garage', type=int)
    max_garage = request.args.get('max_garage', type=int)
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)

    # start with base query
    query = Property.query

    # Apply filters if they exist
    if type_id:
        query = query.filter(Property.type_id == type_id)
    if min_beds:
        query = query.filter(Property.num_bedrooms >= min_beds)
    if max_beds:
        query = query.filter(Property.num_bedrooms <= max_beds)
    if min_baths:
        query = query.filter(Property.num_bathrooms >= min_baths)
    if max_baths:
        query = query.filter(Property.num_bathrooms <= max_baths)
    if min_garage:
        query = query.filter(Property.num_garage >= min_garage)
    if max_garage:
        query = query.filter(Property.num_garage <= max_garage)
    if min_price:
        query = query.filter(Property.price >= min_price)
    if max_price:
        query = query.filter(Property.price <= max_price)

    properties = query.all()

    result = [{
        'property_id': p.property_id,
        'title': p.title,
        'description': p.description,
        'price': float(p.price),
        'location': p.location,
        'num_bedrooms': p.num_bedrooms,
        'num_bathrooms': p.num_bathrooms,
        'num_garage': p.num_garage,
        'image_url': p.image_url,
        'user_id': p.user_id,
        'type_id': p.type_id,
        'type_name': p.type.type_name if p.type else None,
        'created_at': p.created_at.isoformat()
    } for p in properties]

    return jsonify(result), 200

# Get property by ID
@properties_bp.route('/<int:property_id>', methods=['GET'])
def get_property(property_id):
    p = Property.query.get(property_id)
    if not p:
        return jsonify({'error': 'Property not found'}), 404
    return jsonify({
        'property_id': p.property_id,
        'title': p.title,
        'description': p.description,
        'price': float(p.price),
        'location': p.location,
        'num_bedrooms': p.num_bedrooms,
        'num_bathrooms': p.num_bathrooms,
        'num_garage': p.num_garage,
        'image_url': p.image_url,
        'user_id': p.user_id,
        'type_id': p.type_id,
        'type_name': p.type.type_name if p.type else None,
        'created_at': p.created_at.isoformat()
    }), 200

# Update property
@properties_bp.route('/<int:property_id>', methods=['PUT'])
def update_property(property_id):
    p = Property.query.get(property_id)
    if not p:
        return jsonify({'error': 'Property not found'}), 404

    data = request.json
    for field in ['title', 'description', 'price', 'location', 'num_bedrooms', 'num_bathrooms', 'num_garage', 'image_url', 'user_id', 'type_id']:
        if field in data:
            setattr(p, field, data[field])
    db.session.commit()
    return jsonify({'message': 'Property updated'}), 200

# Delete property
@properties_bp.route('/<int:property_id>', methods=['DELETE'])
def delete_property(property_id):
    p = Property.query.get(property_id)
    if not p:
        return jsonify({'error': 'Property not found'}), 404

    db.session.delete(p)
    db.session.commit()
    return jsonify({'message': 'Property deleted'}), 200
