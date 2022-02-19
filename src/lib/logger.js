import { Colour } from '../lib/consoleColour.js';

class logger {
	/**
	 * The length to pad the log type to
	 * 
	 * @access private
	 * @static
	 * 
	 * @type {number}
	 */
	static #padLen = 8;

	/**
	 * Logs a generic event
	 * 
	 * @access public
	 * @static
	 * 
	 * @param {*}		str 			The content of the log event.
	 * @param {boolean}	[debug]			Whether the log is only to be printed during development.
	 * 
	 * @returns {void}
	 */
	static log(str, debug) {
		if (debug && process.env.NODE_ENV=='production') return;
		console.log(`${Colour.grey}${(this.#curTime())}${Colour.reset} ${str}`);
	}

	/**
	 * Logs an informational event
	 * 
	 * @access public
	 * @static
	 * 
	 * @param {*}		str 			The content of the log event.
	 * @param {boolean}	[debug]			Whether the log is only to be printed during development.
	 * 
	 * @returns {void}
	 */
	static info(str, debug) {
		this.#richLog(str, 'INFO', Colour.cyan, debug);
	}

	/**
	 * Logs a warning event
	 * 
	 * @access public
	 * @static
	 * 
	 * @param {*}		str 			The content of the log event.
	 * @param {boolean}	[debug]			Whether the log is only to be printed during development.
	 * 
	 * @returns {void}
	 */
	static warn(str, debug) {
		this.#richLog(str, 'WARN', Colour.yellow, debug);
	}

	/**
	 * Logs an error event
	 * 
	 * @access public
	 * @static
	 * 
	 * @param {*}		str				The content of the log event.
	 * @param {boolean}	[debug]			Whether the log is only to be printed during development.
	 * 
	 * @returns {void}
	 */
	static error(str, debug) {
		this.#richLog(str, 'ERROR', Colour.red, debug);
	}

	/**
	 * Logs an acknowledgement event
	 * 
	 * @access public
	 * @static
	 * 
	 * @param {*}		str				The content of the log event.
	 * @param {boolean}	[debug]			Whether the log is only to be printed during development.
	 * 
	 * @returns {void}
	 */
	static ok(str, debug) {
		this.#richLog(str, 'OK', Colour.green, debug);
	}

	/**
	 * Generates a string containing the current system time in the format HH:mm:ss
	 * 
	 * @access private
	 * @static
	 * 
	 * @returns {string}				The time string.
	 */
	static #curTime() {
		let d = new Date(Date.now());
		return `[${this.#pad(d.getHours(), 2)}:${this.#pad(d.getMinutes(), 2)}:${this.#pad(d.getSeconds(), 2)}]`;
	}

	/**
	 * Pads a number n, to be l characters long, using optional character c
	 * 
	 * @access private
	 * @static
	 * 
	 * @param {number}	n				The number to be padded.
	 * @param {*}		len				The length to pad the number to.
	 * @param {string}	[char='0']		The character to pad with (Default 0).
	 * 
	 * @returns {string}				The padded number.
	 */
	static #pad(n, len, char = '0') {
		return n.toString().padStart(len, char);
	}

	/**
	 * Creates a rich log string containing the log type and text content with appropriate colouration.
	 * 
	 * @access private
	 * @static
	 * 
	 * @param {*}		str				The content of the log event.
	 * @param {*}		type			The type of event being logged.
	 * @param {*}		colour			The colour of the event type.
	 * @param {boolean}	[debug]			Whether the log is only to be printed during development.
	 * 
	 * @returns {string}				Formatted log content.
	 */
	static #richLog(str, type, colour, debug) {
		const colourText = `${colour}${type}${Colour.reset}`;
		this.log(`${`[${colourText}]`.padStart(this.#padLen + (colourText.length - type.length))} ${str}`, debug);
	}
}

export default logger;
