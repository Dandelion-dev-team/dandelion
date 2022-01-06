"""empty message

Revision ID: 470499ba086c
Revises: 36dab40f990b
Create Date: 2021-12-22 10:35:02.183730

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '470499ba086c'
down_revision = '36dab40f990b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('quantity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=60), nullable=False),
    sa.Column('unit', sa.String(length=5), nullable=True),
    sa.Column('help_url', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('quantity')
    # ### end Alembic commands ###
