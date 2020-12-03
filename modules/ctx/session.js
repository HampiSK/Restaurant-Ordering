/** @Module Session */

/**
  * @Function
  * Add/modify data which are supposed to be asigned into ctx session (cookies).
  * Based on that user is allowed to browse website or not.
  *
  * @param {object} [data = {}] - On default is empty.
  *                             - Needs to contain user ID (UserId) as well as username (UserName).
  *
  * @return {object} - Data which allows user to browse website.
  *
  */
const ctxSession = (data = {}) => {
	if (!Object.keys(data).length) {
		return {
			authorised: false,
			username: null,
			userid: null
		}
	}
	return {
		userid: data.UserId,
		username: data.UserName,
		authorised: true
	}
}


/** @Session Export */
export default ctxSession
