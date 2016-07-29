"""empty message

Revision ID: 19faa11b3029
Revises: 2f683595dfee
Create Date: 2016-07-22 13:32:25.408455

"""

# revision identifiers, used by Alembic.
revision = '19faa11b3029'
down_revision = '2f683595dfee'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'gender',
               existing_type=postgresql.ENUM('male', 'female', name='gender'),
               nullable=True)
    op.drop_index('ix_user_email', table_name='user')
    op.drop_index('ix_user_social_id', table_name='user')
    op.create_unique_constraint(None, 'user', ['email'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.create_index('ix_user_social_id', 'user', ['social_id'], unique=False)
    op.create_index('ix_user_email', 'user', ['email'], unique=True)
    op.alter_column('user', 'gender',
               existing_type=postgresql.ENUM('male', 'female', name='gender'),
               nullable=False)
    ### end Alembic commands ###
