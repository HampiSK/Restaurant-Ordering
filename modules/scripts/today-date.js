/** @Module Today Date */

const barrier = 10 // To format digit into required format 
const max = 200 // Maximum value for minAge

/**
  * @Function
  * Modify time to required format.
  * 
  * @Alert
  * Not pure function, using barier const
  * 
  * @param {object} [today] - Object with time.
  *  
  * @return {string} - Time with required format.
  * 
  */
const modifyTime = (today) => { 
    // Get time
    let ss = today.getSeconds()
	let mn = today.getMinutes()
	let hh = today.getHours()
    
    // Modifing time format
    if (ss < barrier) ss = `0${ss}`
    if (mn < barrier) mn = `0${mn}`
    if (hh < barrier) hh = `0${hh}`

	return `${hh}:${mn}:${ss}`
}



/**
  * @Function
  * Modify date to required format.
  * 
  * @Alert
  * Not pure function, using barier and max const
  * 
  * @param {object} [today]  - Object with date.
  * @param {number} [minAge] - Year to substract current year.
  *  
  * @return {string} - Date with required format.
  * 
  */
const modifyDate = (today, minAge) => {    
    if (minAge > max) throw new Error(`Value 'minAge' is more then '${max}'`)
    if (minAge < 0) throw new Error("Value 'minAge' is less then 0")
    
    // Get date
    const yyyy = today.getFullYear() - minAge
    let mm = today.getMonth() + 1
	let dd = today.getDate()
    
    // Modifing date format
	if (dd < barrier) dd = `0${dd}`
	if (mm < barrier) mm = `0${mm}`

	return `${yyyy}-${mm}-${dd}`
}

/**
  * @Function
  * Get today date with required format and return it.
  * 
  * @Alert
  * Async function
  *  
  * Optional:
  * @param {number} [minAge] - Year to substract current year. Default is 0. 
  * @param {string} [option] - Option of today date format. On default returns date with time or it
  *                            can be "date", which returns only date.
  *  
  * @return {string} - Date with required format.
  * 
  */
const todayDate = async(minAge = 0, option = '') => {  
	const today = new Date()
    try{
        if(option === "date")
            return `${modifyDate(today, minAge)}`
        else
            return `${modifyDate(today, minAge)} ${modifyTime(today)}`       
    }catch(err){
        throw new Error(`Something went wrong in todayDate() => ${err.message}`)
    }
}

/** @Export For Today Date */
export default todayDate 