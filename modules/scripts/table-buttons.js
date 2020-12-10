/** @Scripts For Table Buttons */

/* Modules */
import Tables from '../builders/tables.js'

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
				await dinerAdd(Id,table)
				break
			case 'Delete Diner':
				await dinerDel(Id,table)
				break
		}
	}catch(err) {
		throw new Error(`tableButton(): ${err.message}`)
	}
}

const dinerDel = async(tableId,table) => {
	try{
		const DATA2 = await table.Get({TableId: Id},'Diners')
		let num2 = DATA2.Diners
		num2--
		if (num2 < 0) num2 = 0
		await table.Modify({Diners: num2}, Id)
	}catch(err) {
		throw new Error(`dinerAdd(): ${err.message}`)
	}
}

const dinerAdd = async(tableId,table) => {
	try{
		const DATA = await table.Get({TableId: Id},'Diners')
		let num = DATA.Diners
		num++
		await table.Modify({Diners: num}, Id)
	}catch(err) {
		throw new Error(`dinerAdd(): ${err.message}`)
	}
}

const tableAdd = async(userId,table) => {
	try {
		const body = {
			CreatorId: userId
		}
		await table.Create(body)
	}catch(err) {
		throw new Error(`tableAdd(): ${err.message}`)
	}
}

const tableDel = async(userId,table) => {
	try{
		const TABLES = await table.GetTables()
		const DEACTIVATE = TABLES[TABLES.length - 1]
		delete DEACTIVATE.TableName
		DEACTIVATE.InUse = 0
		await table.Modify(DEACTIVATE,DEACTIVATE.TableId)
	}catch(err) {
		throw new Error(`tableAdd(): ${err.message}`)
	}
}

export default tableButton
