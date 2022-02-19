/* eslint-disable camelcase */

module.exports.shorthands = undefined;

module.exports.up = pgm => {
	pgm.createTable('question_log', {
		id: { 
			type: 'int', 
			primaryKey: true, 
			autoIncrement: true 
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
		ask_time: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		}
	});
};

module.exports.down = pgm => {
	pgm.dropTable('question_log');
};
