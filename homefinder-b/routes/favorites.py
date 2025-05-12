# routes/favorites.py
from flask import Blueprint, request, jsonify
from models import db, Favorite

favorites_bp = Blueprint('favorites', __name__)

@favorites_bp.route('/favorites', methods=['POST'])
def add_favorite():
    data = request.get_json()
    user_id = data.get('user_id')
    property_id = data.get('property_id')

    # Check if already favorited
    existing = Favorite.query.filter_by(
        user_id=user_id,
        property_id=property_id
    ).first()

    if existing:
        return jsonify({'message': 'Already in favorites'}), 400

    favorite = Favorite(user_id=user_id, property_id=property_id)
    db.session.add(favorite)
    db.session.commit()

    return jsonify({
        'favorite_id': favorite.id,
        'property_id': favorite.property_id
    }), 201

@favorites_bp.route('/favorites/<int:user_id>', methods=['GET'])
def get_favorites(user_id):
    try:
        # Join Favorite and Property tables to get all property details
        favorites = db.session.query(Property)\
            .join(Favorite, Property.property_id == Favorite.property_id)\
            .filter(Favorite.user_id == user_id)\
            .all()

        result = [{
            'property_id': prop.property_id,
            'title': prop.title,
            'description': prop.description,
            'price': float(prop.price),
            'location': prop.location,
            'num_bedrooms': prop.num_bedrooms,
            'num_bathrooms': prop.num_bathrooms,
            'num_garage': prop.num_garage,
            'image_url': prop.image_url,
            'user_id': prop.user_id,
            'type_id': prop.type_id,
            'created_at': prop.created_at.isoformat() if prop.created_at else None
        } for prop in favorites]

        return jsonify(result), 200

    except Exception as e:
        print(f"Error in get_favorites: {str(e)}")  # Server-side logging
        return jsonify({'error': str(e)}), 500
