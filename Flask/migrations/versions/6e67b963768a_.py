"""empty message

Revision ID: 6e67b963768a
Revises: e9619687d684
Create Date: 2022-03-25 15:54:36.807881

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6e67b963768a'
down_revision = 'e9619687d684'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('condition', sa.Column('code', sa.String(length=10), nullable=True))
    op.add_column('condition', sa.Column('text', sa.String(length=200), nullable=True))
    op.add_column('condition', sa.Column('colour', sa.String(length=7), nullable=True))
    op.drop_column('condition', 'condition_text')
    op.add_column('experiment', sa.Column('parent_id', sa.Integer(), nullable=True))
    op.add_column('experiment', sa.Column('code', sa.String(length=10), nullable=True))
    op.add_column('experiment', sa.Column('text', sa.String(length=200), nullable=True))
    op.create_foreign_key(None, 'experiment', 'experiment', ['parent_id'], ['id'])
    op.drop_column('experiment', 'is_synchronised')
    op.drop_column('experiment', 'experiment_text')
    op.add_column('hypothesis', sa.Column('text', sa.String(length=200), nullable=True))
    op.drop_column('hypothesis', 'hypothesis_text')
    op.add_column('quantity', sa.Column('lower_limit', sa.DECIMAL(), nullable=True))
    op.add_column('quantity', sa.Column('upper_limit', sa.DECIMAL(), nullable=True))
    op.add_column('variable', sa.Column('is_sensor_quantity', sa.Boolean(), nullable=True))
    op.add_column('variable', sa.Column('procedure', sa.String(length=200), nullable=True))
    op.drop_constraint('variable_ibfk_3', 'variable', type_='foreignkey')
    op.drop_constraint('variable_ibfk_2', 'variable', type_='foreignkey')
    op.drop_constraint('variable_ibfk_1', 'variable', type_='foreignkey')
    op.drop_column('variable', 'condition_id')
    op.drop_column('variable', 'variable_role')
    op.drop_column('variable', 'node_sensor_id')
    op.drop_column('variable', 'quantity_id')
    op.add_column('variable', sa.Column('quantity_id', sa.Integer, nullable=True))
    op.create_foreign_key(constraint_name='variable_quantity_fk',
                          source_table='variable',
                          referent_table='quantity',
                          local_cols=['quantity_id'],
                          remote_cols=['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('variable', sa.Column('node_sensor_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    op.add_column('variable', sa.Column('variable_role', mysql.VARCHAR(length=30), nullable=True))
    op.add_column('variable', sa.Column('condition_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    op.create_foreign_key('variable_ibfk_1', 'variable', 'condition', ['condition_id'], ['id'])
    op.create_foreign_key('variable_ibfk_2', 'variable', 'node_sensor', ['node_sensor_id'], ['id'])
    op.create_index('quantity_id', 'variable', ['quantity_id'], unique=False)
    op.create_index('node_sensor_id', 'variable', ['node_sensor_id'], unique=False)
    op.create_index('condition_id', 'variable', ['condition_id'], unique=False)
    op.drop_column('variable', 'procedure')
    op.drop_column('variable', 'is_sensor_quantity')
    op.drop_column('quantity', 'upper_limit')
    op.drop_column('quantity', 'lower_limit')
    op.add_column('hypothesis', sa.Column('hypothesis_text', mysql.VARCHAR(length=200), nullable=True))
    op.drop_column('hypothesis', 'text')
    op.add_column('experiment', sa.Column('experiment_text', mysql.VARCHAR(length=200), nullable=True))
    op.add_column('experiment', sa.Column('is_synchronised', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'experiment', type_='foreignkey')
    op.drop_column('experiment', 'text')
    op.drop_column('experiment', 'code')
    op.drop_column('experiment', 'parent_id')
    op.add_column('condition', sa.Column('condition_text', mysql.VARCHAR(length=200), nullable=True))
    op.drop_column('condition', 'colour')
    op.drop_column('condition', 'text')
    op.drop_column('condition', 'code')
    # ### end Alembic commands ###
