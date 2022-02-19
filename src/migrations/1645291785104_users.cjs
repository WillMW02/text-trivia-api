/* eslint-disable camelcase */
module.exports.shorthands = undefined;

module.exports.up = pgm => {
	pgm.createTable('users', {
		id: { 
			type: 'int', 
			primaryKey: true, 
			autoIncrement: true 
		},
		username: { 
			type: 'string',
			notNull: true,
			unique: true
		},
		password: {
			type: 'string',
			notNull: true
		},
		mobile_no: {
			type: 'string',
			notNull: true
		},
		signup_date: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		}
	});
};

module.exports.down = pgm => {
	pgm.dropTable('users');
};
