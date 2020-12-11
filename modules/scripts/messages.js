/** @Script For Messages */

/* Modules */
import todayDate from './today-date.js'

/**
  * @Function
  * Cases for console message.
  *
  * @param {object} [ctx]      - Context.
  * @param {string} [option]   - Type of message returned.
  * @param {string} [message]  - Additional message if needed.
  * @param {string} [date]     - Current date.
  *
  */
const switchCases = (ctx,option,message,date) => {
	switch(option) {
		case 'request':
			console.log(request(date,ctx))
			break
		case 'sucessful':
			console.log(sucessful(date,ctx))
			break
		case 'failed':
			console.log(failed(date,ctx,message))
			break
		case 'modified':
			console.log(modified(date,ctx,message))
			break
		default:
			throw new Error('Invalid option')
	}
}

/**
  * @Function
  * Print specified console message.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {string} [option] - Type of message returned.
  *
  * Optional:
  * @param {string} [message]    - On default is value "unknown error".
  *                              - Additional message if needed.
  *
  */
const message = async(ctx,option,message = 'unknown error') => {
	const DATE = await todayDate()
	try{
		switchCases(ctx,option,message,DATE)
	}catch(err) {
		throw new Error(`message(): Message not generated => ${err.message}`)
	}
}


/**
  * @Function
  * Return message "modified".
  *
  * @param {string} [date] - Current date.
  * @param {object} [ctx] - Context.
  * @param {string} [message] - Additional message.
  *
  */
const modified = (date,ctx,message) => {
	const MESSAGE = `${date} - METHOD ${ctx.method.toUpperCase()}: ${message} user: `+
                    `'${ctx.hbs.username}' id: '${ctx.hbs.userid}' in path: '${ctx.path}'`
	return MESSAGE
}


/**
  * @Function
  * Return message "requested".
  *
  * @param {string} [date] - Current date.
  * @param {object} [ctx] - Context.
  *
  */
const request = (date,ctx) => {
	const MESSAGE = `${date} - METHOD ${ctx.method.toUpperCase()}: Requested for user: `+
                    `'${ctx.hbs.username}' id: '${ctx.hbs.userid}' in path: '${ctx.path}'`
	return MESSAGE
}


/**
  * @Function
  * Return message "sucessful".
  *
  * @param {string} [date] - Current date.
  * @param {object} [ctx] - Context.
  *
  */
const sucessful = (date,ctx) => {
	const MESSAGE = `${date} - METHOD ${ctx.method.toUpperCase()}: Successful for user: `+
                    `'${ctx.hbs.username}' id: '${ctx.hbs.userid}' in path: '${ctx.path}'`
	return MESSAGE
}


/**
  * @Function
  * Return message "failed".
  *
  * @param {string} [date] - Current date.
  * @param {object} [ctx] - Context.
  * @param {string} [message] - Error message.
  *
  */
const failed = (date,ctx,message) => {
	const MESSAGE = `${date} - METHOD ${ctx.method.toUpperCase()}: Failed for user: `+
                    `'${ctx.hbs.username}' id: '${ctx.hbs.userid}' in path: '${ctx.path}' due to ${message}`
	return MESSAGE
}

/** @Export For Messages */
export default message
