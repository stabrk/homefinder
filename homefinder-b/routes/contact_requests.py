from flask import Blueprint, request, jsonify
from models import db, ContactRequest

contact_requests_bp = Blueprint('contact_requests', __name__)

# Send a contact request
@contact_requests_bp.route('/contact-requests', methods=['POST'])
def send_contact_request():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    message = data.get('message')
    property_id = data.get('property_id')

    if not all([name, email, message, property_id]):
        return jsonify({'error': 'Missing required fields'}), 400

    request_obj = ContactRequest(
        name=name,
        email=email,
        phone=phone,
        message=message,
        property_id=property_id
    )
    db.session.add(request_obj)
    db.session.commit()

    return jsonify({'message': 'Contact request sent successfully'}), 201
 
