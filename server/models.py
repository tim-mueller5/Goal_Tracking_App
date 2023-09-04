from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    # _password_hash = db.Column(db.String, nullable=False)

    goals = db.relationship('Goal', backref='user', cascade='all, delete-orphan')

class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    habits = db.relationship('Habit', backref='goal', cascade='all, delete-orphan')
    tasks = db.relationship('Task', backref='goal', cascade='all, delete-orphan')


class Habit(db.Model, SerializerMixin):
    __tablename__ = 'habits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"))


class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)

    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"))