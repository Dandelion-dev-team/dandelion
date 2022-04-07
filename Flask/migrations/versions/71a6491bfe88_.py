"""empty message

Revision ID: 71a6491bfe88
Revises: d74b9cd15141
Create Date: 2022-04-05 16:35:27.074149

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql


# revision identifiers, used by Alembic.
revision = '71a6491bfe88'
down_revision = 'd74b9cd15141'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('question', sa.Column('description', sa.String(length=500), nullable=False))
    op.alter_column('condition', 'text',
                    existing_type=mysql.VARCHAR(length=5000))
    op.alter_column('experiment', 'text',
                    existing_type=mysql.VARCHAR(length=5000))
    op.alter_column('hypothesis', 'text',
                    existing_type=mysql.VARCHAR(length=5000))
    op.alter_column('project', 'project_text',
                    existing_type=mysql.VARCHAR(length=5000))
    op.alter_column('response', 'response_text',
                    existing_type=mysql.VARCHAR(length=5000))
    op.alter_column('condition', 'description',
                    existing_type=mysql.VARCHAR(length=500))
    op.alter_column('experiment', 'description',
                    existing_type=mysql.VARCHAR(length=500))
    op.alter_column('hypothesis', 'description',
                    existing_type=mysql.VARCHAR(length=500), nullable=False)
    op.alter_column('level', 'description',
                    existing_type=mysql.VARCHAR(length=500))
    op.alter_column('node_alert', 'description',
                    existing_type=mysql.VARCHAR(length=500), nullable=False)
    op.alter_column('option', 'description',
                    existing_type=mysql.VARCHAR(length=500))
    op.alter_column('project', 'description',
                    existing_type=mysql.VARCHAR(length=500), nullable=False)
    op.alter_column('sensor', 'description',
                    existing_type=mysql.VARCHAR(length=500))
    op.alter_column('experiment', 'title',
                    existing_type=mysql.VARCHAR(length=100), nullable=False)
    op.alter_column('project', 'title',
                    existing_type=mysql.VARCHAR(length=100), nullable=False)
    op.alter_column('report', 'title',
                    existing_type=mysql.VARCHAR(length=100), nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('question', 'description')
    # ### end Alembic commands ###