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

    max_health = db.Column(db.Integer)
    current_health = db.Column(db.Integer)
    base_atk_stat = db.Column(db.Integer)
    base_def_stat = db.Column(db.Integer)
    base_magic_stat = db.Column(db.Integer)
    equipped_weapon = db.Column(db.Integer)  # inventory_item id

    inventory_items = db.relationship('InventoryItem', backref='user', cascade='all, delete-orphan')
    goals = db.relationship('Goal', backref='user', cascade='all, delete-orphan')

    serialize_rules = ('-goals.user', '-_password_hash','-inventory_items.user',)

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
    completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.Date)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    habits = db.relationship('Habit', backref='goal', cascade='all, delete-orphan')
    tasks = db.relationship('Task', backref='goal', cascade='all, delete-orphan')

    serialize_rules = ('-user.goals','-habits.goal', '-tasks.goal')



class Habit(db.Model, SerializerMixin):
    __tablename__ = 'habits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    completed = db.Column(db.Boolean, default=False)
    frequency = db.Column(db.String)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)

    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"))

    checkins = db.relationship('HabitCheckIn', backref='habit', cascade='all, delete-orphan')

    serialize_rules = ('-goal.habits', '-goal.tasks')

class HabitCheckIn(db.Model, SerializerMixin):
    __tablename__ = 'habitcheckins'

    id = db.Column(db.Integer, primary_key=True)
    completed = db.Column(db.Boolean, default=False)
    date = db.Column(db.Date)

    habit_id = db.Column(db.Integer, db.ForeignKey("habits.id"))

    serialize_rules = ('-habit.checkins',)


class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.Date)

    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"))

    serialize_rules = ('-goal.tasks', '-goal.habits')

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    atk_stat = db.Column(db.Integer)
    def_stat = db.Column(db.Integer)
    magic_stat = db.Column(db.Integer)
    health_stat = db.Column(db.Integer)

    inventory_items = db.relationship('InventoryItem', backref='item', cascade='all, delete-orphan')

    serialize_rules = ('-inventory_items.item',)

class InventoryItem(db.Model, SerializerMixin):
    __tablename__ = "inventoryItems"

    id = db.Column(db.Integer, primary_key=True)
    equipped = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"))

    serialize_rules = ('-user.inventory_items', '-item.inventory_items', '-user.goals')

class Monster(db.Model, SerializerMixin):
    __tablename__ = 'monsters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    health = db.Column(db.Integer)
    atk_stat = db.Column(db.Integer)
    def_stat = db.Column(db.Integer)
    magic_stat = db.Column(db.Integer)