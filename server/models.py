from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    character_top = db.Column(db.Integer, nullable=False)
    character_mid = db.Column(db.Integer, nullable=False)
    character_bot = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @validates('username')
    def validate_username(self, key, value):
        usernames = User.query.all()
        if not value and value in usernames:
            raise ValueError('Username must be Unique')
        return value
    
    serialize_rules = ('-posts.users',)

    @hybrid_property
    def password_hash(self):
        raise Exception("Password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))


class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    @validates("title")
    def validate_title(self, key, value):
        if len(value) < 0 and len(value) > 150:
            raise ValueError("Content must be between 0 and 150 characters")
        return value

    @validates("content")
    def validate_content(self, key, value):
        if len(value) < 0 and len(value) > 1500:
            raise ValueError("Content must be between 0 and 500 characters")
        return value

    serialize_rules = ("-users.posts","-users._password_hash",)