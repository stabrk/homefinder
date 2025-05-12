# app.py
from flask import Flask 
from flask_cors import CORS

from config import Config
from db import db
from routes.users import users_bp  # Import the Blueprint
from routes.properties import properties_bp,create_initial_property_types
from routes.favorites import favorites_bp
from routes.contact_requests import contact_requests_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app)

# Register routes
app.register_blueprint(users_bp)
app.register_blueprint(properties_bp)
app.register_blueprint(favorites_bp)
app.register_blueprint(contact_requests_bp)

# Create tables on first run
with app.app_context():
     db.create_all()
     create_initial_property_types()

if __name__ == '__main__':
    app.run(debug=True)

