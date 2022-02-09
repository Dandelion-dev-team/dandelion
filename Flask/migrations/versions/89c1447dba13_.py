"""empty message

Revision ID: 89c1447dba13
Revises: 05b91233f968
Create Date: 2022-01-11 10:47:48.637953

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '89c1447dba13'
down_revision = '05b91233f968'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('audit_detail',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('audit_id', sa.Integer(), nullable=False),
    sa.Column('column_name', sa.String(length=100), nullable=True),
    sa.Column('old_value', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['audit_id'], ['audit.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('audit_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('audit_detail')
    # ### end Alembic commands ###