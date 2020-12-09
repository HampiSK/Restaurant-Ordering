/** @Scripts For Table Buttons */

/* Modules */
import Tables from '../builders/tables.js'

/* Constants */
const DBNAME = 'website.db'

/**
  * @Function
  * Actions for buttons in table
  *
  * @Alert
  * Async function
  *
  * @param {string} [option] - Button action
  *
  */
const tableButton = async(table, Id, option) => {
	try{       
		switch (option) {
			case 'Add Table':
				await tableAdd(Id,table)
				break
			case 'Delete Table':
				await tableDel(Id,table)				
                break  
            case 'Add Diner':
                const DATA = await table.Get({TableId: Id},"Diners")
                let num = DATA.Diners
                num++
                await table.Modify({Diners: num}, Id)
                break  
            case 'Delete Diner':
                const DATA2 = await table.Get({TableId: Id},"Diners")
                let num2 = DATA2.Diners
                num2--
                if (num2 < 0) num2 = 0
                await table.Modify({Diners: num2}, Id)
                break                  
		}
	}catch(err) {
		throw new Error(`tableButton(): ${err.message}`)
	}
}

/**
  * @Function
  * Action for adding table
  *
  * @Alert
  * Async function
  *
  * @param {string} [option] - Button action
  *
  */
const tableAdd = async(userId,table) => {
	const body = {
		CreatorId: userId
	}
	await table.Create(body)
}

/**
  * @Function
  * Action for adding table
  *
  * @Alert
  * Async function
  *
  * @param {string} [option] - Button action
  *
  */
const tableDel = async(userId,table) => {
	const TABLES = await table.GetTables()
	const DEACTIVATE = TABLES[TABLES.length - 1]
	delete DEACTIVATE.TableName
	DEACTIVATE.InUse = 0
	await table.Modify(DEACTIVATE,DEACTIVATE.TableId)
}

export default tableButton
