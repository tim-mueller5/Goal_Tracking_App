"""add item and inventryitem tables

Revision ID: b11b87888abb
Revises: 02bb5d421faf
Create Date: 2023-09-14 09:42:20.275880

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b11b87888abb'
down_revision = '02bb5d421faf'
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
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inventoryItems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('item_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['item_id'], ['items.id'], name=op.f('fk_inventoryItems_item_id_items')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_inventoryItems_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('max_health', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('current_health', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('base_atk_stat', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('base_def_stat', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('base_magic_stat', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('base_magic_stat')
        batch_op.drop_column('base_def_stat')
        batch_op.drop_column('base_atk_stat')
        batch_op.drop_column('current_health')
        batch_op.drop_column('max_health')

    op.drop_table('inventoryItems')
    op.drop_table('items')
    # ### end Alembic commands ###
