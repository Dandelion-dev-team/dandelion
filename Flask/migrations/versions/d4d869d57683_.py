"""empty message

Revision ID: d4d869d57683
Revises: 60d5b093879b
Create Date: 2022-03-27 16:08:37.291361

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'd4d869d57683'
down_revision = '60d5b093879b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('response_variable',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('experiment_id', sa.Integer(), nullable=False),
    sa.Column('variable_id', sa.Integer(), nullable=False),
    sa.Column('monday', sa.Boolean(), nullable=True),
    sa.Column('tuesday', sa.Boolean(), nullable=True),
    sa.Column('wednesday', sa.Boolean(), nullable=True),
    sa.Column('thursday', sa.Boolean(), nullable=True),
    sa.Column('friday', sa.Boolean(), nullable=True),
    sa.Column('saturday', sa.Boolean(), nullable=True),
    sa.Column('sunday', sa.Boolean(), nullable=True),
    sa.Column('once', sa.Boolean(), nullable=True),
    sa.Column('final', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['experiment_id'], ['experiment.id'], ),
    sa.ForeignKeyConstraint(['variable_id'], ['variable.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('condition_level',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('condition_id', sa.Integer(), nullable=False),
    sa.Column('level_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['condition_id'], ['condition.id'], ),
    sa.ForeignKeyConstraint(['level_id'], ['level.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_constraint('observation_ibfk_2', 'observation', type_='foreignkey')
    op.drop_column('observation', 'condition_variable_id')
    op.drop_table('condition_variable')
    op.drop_table('experiment_variable')
    op.alter_column('condition', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('experiment', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('experiment_participant', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('hypothesis', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('node_alert', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('node_sensor', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.add_column('observation', sa.Column('response_variable_id', sa.Integer(), nullable=False))
    op.alter_column('observation', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.create_foreign_key(None, 'observation', 'response_variable', ['response_variable_id'], ['id'])
    op.alter_column('project', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('project_leader', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('project_partner', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('question', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('report', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    op.alter_column('school', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('school', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('report', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('question', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('project_partner', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('project_leader', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('project', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.add_column('observation', sa.Column('condition_variable_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'observation', type_='foreignkey')
    op.create_foreign_key('observation_ibfk_2', 'observation', 'condition_variable', ['condition_variable_id'], ['id'])
    op.alter_column('observation', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.drop_column('observation', 'response_variable_id')
    op.alter_column('node_sensor', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('node_alert', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('hypothesis', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('experiment_participant', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('experiment', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.alter_column('condition', 'status',
               existing_type=mysql.VARCHAR(length=20),
               nullable=True)
    op.create_table('experiment_variable',
    sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=True, nullable=False),
    sa.Column('experiment_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.Column('variable_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.Column('role', mysql.VARCHAR(length=10), nullable=True),
    sa.Column('monday', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.Column('tuesday', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.Column('wednesday', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.Column('thursday', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.Column('friday', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.Column('saturday', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.Column('sunday', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.Column('final', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['experiment_id'], ['experiment.id'], name='experiment_variable_ibfk_1'),
    sa.ForeignKeyConstraint(['variable_id'], ['variable.id'], name='experiment_variable_ibfk_2'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('condition_variable',
    sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=True, nullable=False),
    sa.Column('condition_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.Column('experiment_variable_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.Column('level_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['condition_id'], ['condition.id'], name='condition_variable_ibfk_1'),
    sa.ForeignKeyConstraint(['experiment_variable_id'], ['experiment_variable.id'], name='condition_variable_ibfk_2'),
    sa.ForeignKeyConstraint(['level_id'], ['level.id'], name='condition_variable_ibfk_3'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('condition_level')
    op.drop_table('response_variable')
    # ### end Alembic commands ###
