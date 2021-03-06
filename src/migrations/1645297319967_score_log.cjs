/* eslint-disable camelcase */

module.exports.shorthands = undefined;

module.exports.up = pgm => {
	pgm.createTable('score_log', {
		id: 'id',
		user_id: {
			type: 'int',
			foreignKey: {
				name: 'user_id_fk',
				table: 'questions',
				rules: {
					onDelete: 'CASCADE',
					onUpdate: 'RESTRICT'
				},
				mapping: {
					user_id: 'id'
				}
			}
		},
		question_id: {
			type: 'int',
			foreignKey: {
				name: 'question_id_fk',
				table: 'questions',
				rules: {
					onDelete: 'CASCADE',
					onUpdate: 'RESTRICT'
				},
				mapping: {
					question_id: 'id'
				}
			}
		},
		points: {
			type: 'int',
			notNull: true,
			default: 0,
		},
		answer_date: {
			type: 'date',
			notNull: true,
			default: pgm.func('current_date')
		}
	});
};

module.exports.down = pgm => {
	pgm.dropTable('score_log');
};
