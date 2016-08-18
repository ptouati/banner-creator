"""addded user id to image model

Revision ID: 155c90535909
Revises: 40cde3c7eadb
Create Date: 2016-08-17 12:06:25.091850

"""

# revision identifiers, used by Alembic.
revision = '155c90535909'
down_revision = '40cde3c7eadb'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('image', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'image', 'user', ['user_id'], ['id'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'image', type_='foreignkey')
    op.drop_column('image', 'user_id')
    ### end Alembic commands ###
