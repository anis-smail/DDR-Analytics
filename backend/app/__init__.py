from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app)
    db.init_app(app)
    
    # Import and register blueprints with correct names
    from app.routes import reports_bp, operations_bp, analysis_bp
    app.register_blueprint(reports_bp)
    app.register_blueprint(operations_bp)
    app.register_blueprint(analysis_bp)
    
    # Add a default route
    @app.route('/')
    def index():
        return {"message": "Drilling Reports API is running"}
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app