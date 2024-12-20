class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///drilling.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'dev-key-change-in-production'  # Change this in production
