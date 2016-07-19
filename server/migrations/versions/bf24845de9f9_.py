"""empty message

Revision ID: bf24845de9f9
Revises: 9fe87ed17d0d
Create Date: 2016-07-15 15:43:10.744953

"""

# revision identifiers, used by Alembic.
revision = 'bf24845de9f9'
down_revision = '9fe87ed17d0d'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('image', sa.Column('title', sa.String(length=120), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('image', 'title')
    ### end Alembic commands ###