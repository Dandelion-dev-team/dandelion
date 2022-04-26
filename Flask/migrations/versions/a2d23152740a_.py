"""empty message

Revision ID: a2d23152740a
Revises: fc73ca161153
Create Date: 2022-04-17 13:30:31.036399

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a2d23152740a'
down_revision = 'fc73ca161153'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('sensor_quantity', sa.Column('label', sa.String(length=60), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('sensor_quantity', 'label')
    # ### end Alembic commands ###
