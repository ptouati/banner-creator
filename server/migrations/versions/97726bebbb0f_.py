"""empty message

Revision ID: 97726bebbb0f
Revises: bf24845de9f9
Create Date: 2016-07-19 13:39:03.020746

"""

# revision identifiers, used by Alembic.
revision = '97726bebbb0f'
down_revision = 'bf24845de9f9'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('image', sa.Column('preview', sa.String(length=64), nullable=True))
    op.create_unique_constraint(None, 'image', ['preview'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'image', type_='unique')
    op.drop_column('image', 'preview')
    ### end Alembic commands ###