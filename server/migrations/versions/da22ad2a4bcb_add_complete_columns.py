"""add complete columns

Revision ID: da22ad2a4bcb
Revises: 42bba6f6ba9e
Create Date: 2023-09-12 09:14:35.699585

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da22ad2a4bcb'
down_revision = '42bba6f6ba9e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('completed', sa.Boolean(), nullable=True))

    with op.batch_alter_table('habits', schema=None) as batch_op:
        batch_op.add_column(sa.Column('completed', sa.Boolean(), nullable=True))

    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('completed', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.drop_column('completed')

    with op.batch_alter_table('habits', schema=None) as batch_op:
        batch_op.drop_column('completed')

    with op.batch_alter_table('goals', schema=None) as batch_op:
        batch_op.drop_column('completed')

    # ### end Alembic commands ###