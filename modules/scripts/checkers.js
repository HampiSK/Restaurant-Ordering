/** @Scripts For Checkers */



/**
  * @Function
  * Data type is checked to ensure that null/undefined data types from database/input are skiped.
  * Compare lenght of string with param max. 
  * Throw error when conditional is true.
  * 
  * @Alert
  * String should be already cleared from unnecessary whitespaces.
  * 
  * @param {string} [val] - String value to compare lenght.
  * @param {number} [max] - Max lenght of string.
  * 
  * Optional:
  * @param {string} [stringName] - On default is value "string"
  *                              - Is supposed to hold name of value to make error clearer 
  *  
  */
const stringLenghtChecker = (val, max, stringName = 'string') => {    
   	if (typeof val === 'string') {
		if (val.length > max) throw new Error(`Lenght of '${stringName}' is too long`)
	} 
}   



/**
  * @Function
  * Data type is checked to ensure that only numbers will be checked.
  * Checking if value is less then 0.
  * 
  * @param {object} [body] - Object with parameters to check.
  *  
  */
const numberChecker = body => {    
    for (const val of Object.keys(body)) {
        
        if(typeof body[val] === 'number') { 
            if(body[val] < 0) throw new Error(`Number for '${val}' is less then 0`)
        }
    }
}



/**
  * @Function
  * String is checked if doesn't contain "empty" value
  * 
  * @param {string} [val] - String value to check.
  * 
  * @return {boolian} 
  *  
  */
const emptyStringChecker = val => {
	if (val === '' || val === 'null' || val === null || val === undefined) return true
	return false
}



/** @Export For Checkers */
export { stringLenghtChecker, emptyStringChecker, numberChecker }
