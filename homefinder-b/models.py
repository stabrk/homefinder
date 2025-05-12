from db import db
from datetime import datetime


# Users Table
class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    properties = db.relationship('Property', backref='user', lazy=True)
    favorites = db.relationship('Favorite', backref='user', lazy=True)

# Property Types Table
class PropertyType(db.Model):
    __tablename__ = 'property_types'
    type_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type_name = db.Column(db.String, nullable=False)

    properties = db.relationship('Property', backref='type', lazy=True)

# Properties Table
class Property(db.Model):
    __tablename__ = 'properties'
    property_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    location = db.Column(db.String, nullable=False)
    num_bedrooms = db.Column(db.Integer, nullable=False)
    num_bathrooms = db.Column(db.Integer, nullable=False)
    num_garage = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    type_id = db.Column(db.Integer, db.ForeignKey('property_types.type_id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    images = db.relationship('PropertyImage', backref='property', lazy=True)
    favorites = db.relationship('Favorite', backref='property', lazy=True)
    contact_requests = db.relationship('ContactRequest', backref='property', lazy=True)

# Property Images Table
class PropertyImage(db.Model):
    __tablename__ = 'property_images'
    image_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.property_id'))
    image_url = db.Column(db.String, nullable=False)

# Favorites Table
class Favorite(db.Model):
    __tablename__ = 'favorites'
    favorite_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.property_id'))

# Contact Requests Table
class ContactRequest(db.Model):
    __tablename__ = 'contact_requests'
    request_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    phone = db.Column(db.String)
    message = db.Column(db.Text, nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.property_id'), nullable=False)
    requested_at = db.Column(db.DateTime, default=datetime.utcnow)
