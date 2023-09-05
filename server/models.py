from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)

    goals = db.relationship('Goal', backref='user', cascade='all, delete-orphan')

    serialize_rules = ('-goals.user', '-_password_hash')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validate_username(self, key, username):
        user = User.query.filter_by(username=username).first()
        if user:
            raise ValueError("Username already exists")
        else:
            return username

class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    details = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    habits = db.relationship('Habit', backref='goal', cascade='all, delete-orphan')
    tasks = db.relationship('Task', backref='goal', cascade='all, delete-orphan')

    serialize_rules = ('-user.goals','-habits.goal', '-tasks.goal')



class Habit(db.Model, SerializerMixin):
    __tablename__ = 'habits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"))


class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)

    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"))