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
		}
	});
};

module.exports.down = pgm => {
	pgm.dropTable('questions');
};
