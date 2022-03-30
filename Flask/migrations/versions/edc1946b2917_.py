"""empty message

Revision ID: edc1946b2917
Revises: 154dbeb3a4ee
Create Date: 2022-03-29 17:15:36.464762

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'edc1946b2917'
down_revision = '154dbeb3a4ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('unit', sa.Column('location', sa.String(length=200), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('unit', 'location')
    # ### end Alembic commands ###
