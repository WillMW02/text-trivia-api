import * as PgSQL from '../lib/pgsql.js';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger.js';
import nodeCron from 'node-cron';

export default class QuestionHost {
	constructor(autoReschedule = true) {
		this.autoReschedule = autoReschedule;
	}

	scheduleCron() {
		const hour = Math.floor(Math.random() * 24);

		if (this.cron) {
			this.unscheduleCron();
		}

		this.cron = nodeCron.schedule(`0 ${hour} * * *`, () => {
			console.debug('Triggering scheduled job now');
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
					Math.floor(new Date().getTime() / 1000),
					this.currentQuestion.id
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
		// TODO load a question from the DB

		let theQuestion = undefined;
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
					theQuestion = lastQuestion;
				} else {
					// this question has already happened, get a new question
					res = await client.query(
						sqlCommands.questions.getNextQuestion
					);
					theQuestion = res.rows[0];
				}
			} else {
				// this question is happening later today, let it be so
				theQuestion = lastQuestion;
			}

		} catch(err) {
			logger.error(err, true);
			throw new Error('An error occurred whilst fetching a question');
		} finally {
			if(client) client.release();
		}

		return theQuestion;
	}
}
