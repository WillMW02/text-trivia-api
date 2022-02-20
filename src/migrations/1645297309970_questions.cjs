/* eslint-disable camelcase */

module.exports.shorthands = undefined;

module.exports.up = pgm => {
	pgm.createTable('questions', {
		id: 'id',
		question: {
			type: 'string',
			unique: true,
			notNull: true
		},
		answer: {
			type: 'string',
			unique: true,
			notNull: true
		},
		last_used: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('to_timestamp(0)')
		}
	});
};

module.exports.down = pgm => {
	pgm.dropTable('questions');
};
