import * as PgSQL from '../lib/pgsql.js';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger.js';
import nodeCron from 'node-cron';

export default class QuestionHost {
	// !!! ABSOLUTELY DISGUSTING BUT WE HAVE 6 HOURS AND I'M SO TIRED
	static instance = undefined;

	constructor(autoReschedule = true) {
		this.autoReschedule = autoReschedule;
	}

	scheduleCron() {
		const hour = Math.floor(Math.random() * 24);

		if (this.cron) {
			this.unscheduleCron();
		}

		this.cron = nodeCron.schedule(`0 ${hour} * * *`, () => {
			logger.info('Triggering scheduled job now', true);
			this.triggerNow(true);

			if (this.autoReschedule) {
				this.scheduleCron();
			} else {
				this.unscheduleCron();
			}
		});
	}

	unscheduleCron() {
		if (this.cron) {
			this.cron.stop();
			this.cron = undefined;
		}
	}

	async triggerNow(reloadQuestion = false) {
		if (reloadQuestion) {
			await this.loadQuestion();
		}
		if (this.currentQuestion) {
			// TODO send the question to the peeps
			
			let client;
			try {
				client = await PgSQL.connect();
				// make sure we get seconds and not ms!
				await client.query(
					sqlCommands.questions.setLastUsed,
					[ Math.floor(new Date().getTime() / 1000), this.currentQuestion.id ]
				);
			} catch(err) {
				logger.error(err, true);
				throw new Error('An error occurred whilst updating the question time');
			} finally {
				if(client) client.release();
			}

			return true;
		}
		return false;
	}

	async loadQuestion() {
		let client;
		try {
			client = await PgSQL.connect();
			let res = await client.query(
				sqlCommands.questions.getLastQuestion
			);
			const lastQuestion = res.rows[0];
			// ! And the hackiest hack goes to...
			const lastQuestionTime = new Date(`${lastQuestion.last_used}UTC`);
			const currentTime = new Date();

			// TODO maybe test this works???
			if (lastQuestionTime.getTime() - currentTime.getTime() < 0) {
				if (lastQuestionTime.setHours(0, 0, 0, 0) == currentTime.setHours(0, 0, 0, 0)) {
					// the question has been sent, but is still accepting answers
					this.currentQuestion = lastQuestion;
				} else {
					// this question has already happened, get a new question
					res = await client.query(
						sqlCommands.questions.getNextQuestion
					);
					this.currentQuestion = res.rows[0];
				}
			} else {
				// this question is happening later today, let it be so
				this.currentQuestion = lastQuestion;
			}
			this.questionLoadedAt = new Date();

		} catch(err) {
			logger.error(err, true);
			throw new Error('An error occurred whilst fetching a question');
		} finally {
			if(client) client.release();
		}
	}

	/*
	  Status codes: 1-Correct, 0-Incorrect, -1-AlreadyAnswered, -2-NotAvailable, -100-NotRegistered
	 */
	async check(number, response) {
		let client;
		let statusCode;
		// ? Absolutely no idea if this will work :P

		try {
			client = await PgSQL.connect();
			let res = await client.query(
				sqlCommands.users.getUserByNumber,
				[ number ]
			);

			const user = res.rows ? res.ros[0] : undefined;

			if (user) {
				if (this.currentQuestion) {
					res = await client.query(
						sqlCommands.scores.getScoreForDate,
						[ user.id, new Date().toISOString().split('T')[0] ]
					);
	
					const answerForToday = res.rows ? res.rows[0] : undefined;
	
					if (answerForToday) {
						return -1;
					} else if (response == this.currentQuestion.answer) {

						const delta = new Date().getTime() - this.questionLoadedAt.getTime();

						let score = 0;
						if (delta < 60000) {
							score = 3;
						} else if (delta < 300000) {
							score = 2;
						} else if (delta < 1800000) {
							score = 1;
						}

						await client.query(
							sqlCommands.scores.insertScore,
							[ user.id, this.currentQuestion.id, score ]
						);

						statusCode =  1;
					} else {
						statusCode =  0;
					}
				} else {
					statusCode = -2;
				}
			} else {
				statusCode = -100;
			}
		} catch(err) {
			logger.error(err, true);
			throw new Error('An error occurred whilst checking user response');
		} finally {
			if(client) client.release();
		}

		return statusCode;
	}

	async endCommunications(number) {
		let client;
		let didDisableUser = false;
		try {
			client = await PgSQL.connect();
			const res = await client.query(
				sqlCommands.users.getUserByNumber,
				[ number ]
			);

			let user = res.rows ? res.ros[0] : undefined;

			if (user) {
				// TODO check if this empty string business works :)
				await client.query(
					sqlCommands.users.changeNumber,
					[ '', user.id ]
				);

				didDisableUser = true;
			}
		} catch(err) {
			logger.error(err, true);
			throw new Error('An error occurred whilst getting/updating mobile numbers');
		} finally {
			if(client) client.release();
		}

		return didDisableUser;
	}
}
