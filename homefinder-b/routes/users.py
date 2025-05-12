# routes/users.py

from flask import Blueprint, request, jsonify
from models import User
from db import db

users_bp = Blueprint('users_bp', __name__, url_prefix='/users')

# Create a new user
@users_bp.route('', methods=['POST'])
def create_user():
    data = request.json
    name = data.get('name')
    email = data.get('email')

    if not name or not email:
        return jsonify({'error': 'Name and email are required'}), 400

    new_user = User(name=name, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created', 'user_id': new_user.user_id}), 201

# Get all users
@users_bp.route('', methods=['GET'])
def get_users():
    users = User.query.all()
    result = [{'user_id': u.user_id, 'name': u.name, 'email': u.email} for u in users]
    return jsonify(result), 200

# Get user by ID
@users_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'user_id': user.user_id, 'name': user.name, 'email': user.email}), 200

 
