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
			return true;
		}
		return false;
	}

	async loadQuestion() {
		// TODO load a question from the DB
	}
}
