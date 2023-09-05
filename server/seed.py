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

        print('Creating Users...')
        user1 = User(username='Tim', password_hash="123")
        db.session.add(user1)
        db.session.commit()
        user2 = User(username='Peter', password_hash="123")
        db.session.add(user2)
        db.session.commit()

        print('Creating Goals...')
        goal1 = Goal(user_id=1, name='Run a Marathon', details='Next marathon date is in three months.')
        db.session.add(goal1)
        db.session.commit()
        goal2 = Goal(user_id=1, name='Learn Spanish', details='Learn before trip.')
        db.session.add(goal2)
        db.session.commit()

        print('Creating Habits...')
        habit1 = Habit(name='Run daily', goal_id=1)
        db.session.add(habit1)
        db.session.commit()
        habit2 = Habit(name='Practice daily', goal_id=2)
        db.session.add(habit1)
        db.session.commit()

        print('Create Tasks...')
        task1 = Task(name='Meet with Fred this weekend', goal_id=1)
        db.session.add(task1)
        db.session.commit()
        task2 = Task(name='Buy spanish book', goal_id=2)
        db.session.add(task2)
        db.session.commit()

        print('Seeding done!')
