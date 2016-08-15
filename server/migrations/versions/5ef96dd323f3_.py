"""empty message

Revision ID: 5ef96dd323f3
Revises: 03b09c3d91cb
Create Date: 2016-08-12 11:48:31.031539

"""

# revision identifiers, used by Alembic.
revision = '5ef96dd323f3'
down_revision = '03b09c3d91cb'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('banner_review', sa.Column('active', sa.BOOLEAN(), nullable=False, default=True,
                                             server_default="true"))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('banner_review', 'active')
    ### end Alembic commands ###
