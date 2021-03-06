"""empty message

Revision ID: 94643881b374
Revises: 97726bebbb0f
Create Date: 2016-07-20 16:49:44.885938

"""

# revision identifiers, used by Alembic.
revision = '94643881b374'
down_revision = '97726bebbb0f'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('status_review', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('review')
    ### end Alembic commands ###
