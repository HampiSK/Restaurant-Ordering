/** @Scripts For Table Buttons */

/**
  * @Function
  * Actions for buttons associated with diners.
  *
  * @Alert
  * Async function.
  *
  * @param {string} [option] - Button action.
  * @param {number} [id]     - Id of value to modify.
  * @param {object} [table]  - Access the table object.
  *
  */
const updateTable = async(table, Id, option) => {
	try{
		switch (option) {
			case 'Add Table':
				await tableAdd(Id,table)
				break
			case 'Delete Table':
				await tableDel(Id,table)
				break
		}
	}catch(err) {
		throw new Error(`updateTable(): ${err.message}`)
	}
}

/**
  * @Function
  * Actions for buttons associated with table.
  *
  * @Alert
  * Async function.
  *
  * @param {string} [option] - Button action.
  * @param {number} [id]     - Id of value to modify.
  * @param {object} [table]  - Access the table object.
  *
  */
const updateDiner = async(table, Id, option) => {
	try{
		switch (option) {
			case 'Add Diner':
				await dinerAdd(Id,table)
				break
			case 'Delete Diner':
				await dinerDel(Id,table)
				break
		}
	}catch(err) {
		throw new Error(`updateDiner(): ${err.message}`)
	}
}

/**
  * @Function
  * Actions for buttons in table
  *
  * @Alert
  * Async function
  *
  * @param {string} [option] - Button action.
  * @param {number} [id]     - Id of value to modify.
  * @param {object} [table]  - Access the table object.
  *
  */
const tableButton = async(table, Id, option) => {
	try{
		if(option === 'Add Table' || option === 'Delete Table')
			await updateTable(table, Id, option)
		else
			await updateDiner(table, Id, option)
	}catch(err) {
		throw new Error(`tableButton(): ${err.message}`)
	}
}


/**
  * @Function
  * Delete diner for table
  *
  * @Alert
  * Async function
  *
  * @param {number} [tableId] - Id if table to modify.
  * @param {object} [table]   - Access table object.
  *
  */
const dinerDel = async(tableId,table) => {
	try{
		const DATA2 = await table.Get({TableId: tableId},'Diners')
		let num2 = DATA2.Diners
		num2--
		if (num2 < 0) num2 = 0
		await table.Modify({Diners: num2}, tableId)
	}catch(err) {
		throw new Error(`dinerAdd(): ${err.message}`)
	}
}

/**
  * @Function
  * Add diner in table
  *
  * @Alert
  * Async function
  *
  * @param {number} [tableId] - Id if table to modify.
  * @param {object} [table]   - Access table object.
  *
  */
const dinerAdd = async(tableId,table) => {
	try{
		const DATA = await table.Get({TableId: tableId},'Diners')
		let num = DATA.Diners
		num++
		await table.Modify({Diners: num}, tableId)
	}catch(err) {
		throw new Error(`dinerAdd(): ${err.message}`)
	}
}

/**
  * @Function
  * Add table
  *
  * @Alert
  * Async function
  *
  * @param {number} [tableId] - Id if table to modify.
  * @param {object} [table]   - Access table object.
  *
  */
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

/**
  * @Function
  * Delete table
  *
  * @Alert
  * Async function
  *
  * @param {number} [tableId] - Id if table to modify.
  * @param {object} [table]   - Access table object.
  *
  */
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

/* Export For Table Buttons */
export default tableButton
