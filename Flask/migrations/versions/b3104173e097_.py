"""empty message

Revision ID: b3104173e097
Revises: 439d001807fd
Create Date: 2022-04-05 17:06:38.275283

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b3104173e097'
down_revision = '439d001807fd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tag_reference', sa.Column('label', sa.String(length=100), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tag_reference', 'label')
    # ### end Alembic commands ###
