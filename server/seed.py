#!/usr/bin/env python3


from random import randint, choice as rc

from app import app
from models import db
from models import User, Goal, Habit, Task, HabitCheckIn, Item, InventoryItem, Monster
import datetime

if __name__ == '__main__':

    with app.app_context():
        print("Starting seed...")

        print("Deleting data...")
        User.query.delete()
        Goal.query.delete()
        Habit.query.delete()
        Task.query.delete()
        HabitCheckIn.query.delete()
        Item.query.delete()
        InventoryItem.query.delete()
        Monster.query.delete()

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
        # level 1 weapons
        stick = Item(name='Stick', type='weapon', atk_stat=1, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(stick)
        db.session.commit()
        rock = Item(name='Rock', type='weapon', atk_stat=1, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(rock)
        db.session.commit()
        # Delute with more level 1 items
        stick = Item(name='Stick', type='weapon', atk_stat=1, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(stick)
        db.session.commit()
        rock = Item(name='Rock', type='weapon', atk_stat=1, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(rock)
        db.session.commit()

        # Level 2 weapons
        knife = Item(name='Knife', type='weapon', atk_stat=2, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(knife)
        db.session.commit()
        brass_knuckles = Item(name='Brass knuckles', type='weapon', atk_stat=2, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(brass_knuckles)
        db.session.commit()

        # Level 3 weapons
        short_sword = Item(name='Short sword', type='weapon', atk_stat=3, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(short_sword)
        db.session.commit()

        # Level 4 weapons
        sword = Item(name='Sword', type='weapon', atk_stat=4, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(sword)
        db.session.commit()

        # Level 5 weapons
        axe = Item(name='Axe', type='weapon', atk_stat=5, def_stat=0, magic_stat=0, health_stat=0)
        db.session.add(axe)
        db.session.commit()

        # Health potions
        weak_health_potion = Item(name='Weak Health Potion', type='health', atk_stat=0, def_stat=0, magic_stat=0, health_stat=1)
        db.session.add(weak_health_potion)
        db.session.commit()
        health_potion = Item(name='Health Potion', type='health', atk_stat=0, def_stat=0, magic_stat=0, health_stat=3)
        db.session.add(health_potion)
        db.session.commit()
        strong_health_potion = Item(name='Strong Health Potion', type='health', atk_stat=0, def_stat=0, magic_stat=0, health_stat=5)
        db.session.add(strong_health_potion)
        db.session.commit()
        pizza = Item(name='Pizza', type='health', atk_stat=0, def_stat=0, magic_stat=0, health_stat=3)
        db.session.add(pizza)
        db.session.commit()
        # Delute with more potions
        weak_health_potion = Item(name='Weak Health Potion', type='health', atk_stat=0, def_stat=0, magic_stat=0, health_stat=1)
        db.session.add(weak_health_potion)
        db.session.commit()
        health_potion = Item(name='Health Potion', type='health', atk_stat=0, def_stat=0, magic_stat=0, health_stat=3)
        db.session.add(health_potion)
        db.session.commit()
        strong_health_potion = Item(name='Strong Health Potion', type='health', atk_stat=0, def_stat=0, magic_stat=0, health_stat=5)
        db.session.add(strong_health_potion)
        db.session.commit()
        pizza = Item(name='Pizza', type='health', atk_stat=0, def_stat=0, magic_stat=0, health_stat=3)
        db.session.add(pizza)
        db.session.commit()


        print("creating inventoryItems...")
        # Giving user 1 a item 1 (Stick)
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
        wolf = Monster(name="Wolf", health=16, atk_stat=2, def_stat=1, magic_stat=0)
        db.session.add(wolf)
        db.session.commit()

        print('Seeding done!')
