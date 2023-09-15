#!/usr/bin/env python3


from random import randint, choice as rc

from app import app
from models import db
from models import User, Goal, Habit, Task, HabitCheckIn, Item, InventoryItem, Monster
import datetime

if __name__ == '__main__':

    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting data...")
        User.query.delete()
        Goal.query.delete()
        Habit.query.delete()
        Task.query.delete()
        HabitCheckIn.query.delete()
        Item.query.delete()
        InventoryItem.query.delete()

        print('Creating Users...')
        user1 = User(username='Tim', password_hash="123", max_health=15, current_health=15, base_atk_stat=1, base_def_stat=1, base_magic_stat=0)
        db.session.add(user1)
        db.session.commit()
        user2 = User(username='Peter', password_hash="123", max_health=15, current_health=15, base_atk_stat=1, base_def_stat=1, base_magic_stat=0)
        db.session.add(user2)
        db.session.commit()

        print('Creating Goals...')
        goal1 = Goal(user_id=1, name='Run a Marathon', details='Next marathon date is in three months.', completed=False, due_date=datetime.date(2023,10,5))
        db.session.add(goal1)
        db.session.commit()
        goal2 = Goal(user_id=1, name='Learn Spanish', details='Learn before trip.', completed=False)
        db.session.add(goal2)
        db.session.commit()

        print('Creating Habits...')
        habit1 = Habit(name='Run daily', goal_id=1, completed=False, frequency='daily', start_date=datetime.date.today(), end_date=datetime.date(2023,10,5))
        db.session.add(habit1)
        db.session.commit()
        habit2 = Habit(name='Practice daily', goal_id=2, completed=False, frequency='daily')
        db.session.add(habit1)
        db.session.commit()

        print('Create Tasks...')
        task1 = Task(name='Meet with Fred this weekend', goal_id=1, completed=False)
        db.session.add(task1)
        db.session.commit()
        task2 = Task(name='Buy spanish book', goal_id=2, completed=False)
        db.session.add(task2)
        db.session.commit()

        print("creating items...")
        # empty_hand = Item(name='None', type='weapon', atk_stat=0, def_stat=0, magic_stat=0, health_stat=0)
        # db.session.add(empty_hand)
        # db.session.commit()
        sword = Item(name='Sword', type='weapon', atk_stat=3, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(sword)
        db.session.commit()
        axe = Item(name='Axe', type='weapon', atk_stat=5, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(axe)
        db.session.commit()
        health_potion = Item(name='Health Potion', type='health', atk_stat=0, def_stat=0, magic_stat=0, health_stat=5)
        db.session.add(health_potion)
        db.session.commit()

        print("creating inventoryItems...")
        # give_empty = InventoryItem(user_id=1, item_id=1) # give to all players
        # db.session.add(give_empty)
        # db.session.commit()
        give_sword = InventoryItem(user_id=1, item_id=1)
        db.session.add(give_sword)
        db.session.commit()

        print("creating monster...")
        blue_slime = Monster(name="Blue Slime", health=6, atk_stat=1, def_stat=0, magic_stat=0)
        db.session.add(blue_slime)
        db.session.commit()
        red_slime = Monster(name="Red Slime", health=12, atk_stat=2, def_stat=1, magic_stat=0)
        db.session.add(red_slime)
        db.session.commit()

        print('Seeding done!')
