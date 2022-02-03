"""empty message

Revision ID: f3a78022fc58
Revises: e83555ce900f
Create Date: 2022-02-03 17:53:08.224063

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f3a78022fc58'
down_revision = 'e83555ce900f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('school', sa.Column('latitude', sa.DECIMAL(precision=8, scale=6), nullable=True))
    op.add_column('school', sa.Column('longitude', sa.DECIMAL(precision=9, scale=6), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('school', 'longitude')
    op.drop_column('school', 'latitude')
    # ### end Alembic commands ###
