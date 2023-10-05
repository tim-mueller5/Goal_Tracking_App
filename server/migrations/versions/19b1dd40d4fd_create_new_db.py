"""create new db

Revision ID: 19b1dd40d4fd
Revises: 
Create Date: 2023-10-05 09:55:03.935035

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19b1dd40d4fd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('atk_stat', sa.Integer(), nullable=True),
    sa.Column('def_stat', sa.Integer(), nullable=True),
    sa.Column('magic_stat', sa.Integer(), nullable=True),
    sa.Column('health_stat', sa.Integer(), nullable=True),
    sa.Column('level', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('monsters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('health', sa.Integer(), nullable=True),
    sa.Column('atk_stat', sa.Integer(), nullable=True),
    sa.Column('def_stat', sa.Integer(), nullable=True),
    sa.Column('magic_stat', sa.Integer(), nullable=True),
    sa.Column('level', sa.Integer(), nullable=True),
    sa.Column('xp', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('max_health', sa.Integer(), nullable=True),
    sa.Column('current_health', sa.Integer(), nullable=True),
    sa.Column('base_atk_stat', sa.Integer(), nullable=True),
    sa.Column('base_def_stat', sa.Integer(), nullable=True),
    sa.Column('base_magic_stat', sa.Integer(), nullable=True),
    sa.Column('equipped_weapon', sa.Integer(), nullable=True),
    sa.Column('level', sa.Integer(), nullable=True),
    sa.Column('xp', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('goals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('details', sa.String(), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('due_date', sa.Date(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_goals_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inventoryItems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('equipped', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('item_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['item_id'], ['items.id'], name=op.f('fk_inventoryItems_item_id_items')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_inventoryItems_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('habits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('frequency', sa.String(), nullable=True),
    sa.Column('start_date', sa.Date(), nullable=True),
    sa.Column('end_date', sa.Date(), nullable=True),
    sa.Column('goal_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['goal_id'], ['goals.id'], name=op.f('fk_habits_goal_id_goals')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('due_date', sa.Date(), nullable=True),
    sa.Column('goal_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['goal_id'], ['goals.id'], name=op.f('fk_tasks_goal_id_goals')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('habitcheckins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('date', sa.Date(), nullable=True),
    sa.Column('habit_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['habit_id'], ['habits.id'], name=op.f('fk_habitcheckins_habit_id_habits')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('habitcheckins')
    op.drop_table('tasks')
    op.drop_table('habits')
    op.drop_table('inventoryItems')
    op.drop_table('goals')
    op.drop_table('users')
    op.drop_table('monsters')
    op.drop_table('items')
    # ### end Alembic commands ###
