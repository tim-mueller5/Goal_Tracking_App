#!/usr/bin/env python3


from random import randint, choice as rc

from app import app
from models import db
from models import User, Goal, Habit, Task

if __name__ == '__main__':

    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting data...")
        User.query.delete()
        Goal.query.delete()
        Habit.query.delete()
        Task.query.delete()

        print('Creating User...')
        user1 = User(username='Tim', password_hash="123")
        db.session.add(user1)
        db.session.commit()
        user2 = User(username='Peter', password_hash="123")
        db.session.add(user2)
        db.session.commit()
