import test from 'ava'
import Items from '../modules/items.js'
import todaydate from '../modules/scripts/today-date.js'
	const sql = 'CREATE TABLE IF NOT EXISTS ITEM_MENU(\
                \'ItemId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'IngredientId\' INTEGER NOT NULL,\
                \'Title\' VARCHAR(75) NOT NULL UNIQUE,\
                \'Type\' VARCHAR(30) NOT NULL,\
                \'Kitchen\' TINYINT(1) NOT NULL DEFAULT 0,\
                \'Price\' FLOAT NOT NULL DEFAULT 0,\
                \'Recipe\' TEXT NULL DEFAULT NULL,\
                \'Instructions\' TEXT NULL DEFAULT NULL,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(IngredientId) REFERENCES INGREDIENT(IngredientId)),\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
test('TABLE : Creating item', async(test) => {
	test.plan(1)
	const body = {
        Title: 'Beef Steak'
		CreatorId: 1,
		Comment: 'Comment'
	}
	const table = await new Tables()
	try {
		await table.Create(body)
		const data = await table.db.get('SELECT * FROM RESTAURANT_TABLE')
		test.is(data.Comment, 'Comment', 'Table comment is not correct')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		table.Close()
	}
})

test('TABLE : Creating table without comment', async(test) => {
	test.plan(1)
	const body = {
		CreatorId: 1
	}
	const table = await new Tables()
	try {
		const checker = await table.Create(body)
		test.is(checker, true, 'unable to create table')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		table.Close()
	}
})

test('TABLE : Comment too long', async(test) => {
	test.plan(1)
	const text = 'TooLong'
	const body = {
		CreatorId: 1,
		Comment: text.repeat(150)
	}
	const table = await new Tables()
	try {
		await table.Create(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'Lenght of string is too long',
			'incorrect error message'
		)
	} finally {
		table.Close()
	}
})

test('TABLE : Creating table without id', async(test) => {
	test.plan(1)
	const body = {
		Comment: 'Comment'
	}
	const table = await new Tables()
	try {
		await table.Create(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'SQLITE_CONSTRAINT: NOT NULL constraint failed: RESTAURANT_TABLE.CreatorId',
			'incorrect error message'
		)
	} finally {
		table.Close()
	}
})

test('TABLE : Table is in use', async(test) => {
	test.plan(1)
	const body = {
		CreatorId: 1
	}
	const table = await new Tables()
	try {
		await table.Create(body)
		const data = await table.db.get('SELECT * FROM RESTAURANT_TABLE')
		test.is(data.InUse, 1, 'Table is not in use')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		table.Close()
	}
})

test('TABLE : Table is not in use', async(test) => {
	test.plan(1)
	const body = {
		CreatorId: 1
	}
	const table = await new Tables()
	try {
		await table.Create(body)
		const data1 = await table.db.get('SELECT * FROM RESTAURANT_TABLE')
		data1.InUse = 0
		await table.Modify(data1, data1.TableId)
		const data2 = await table.db.get('SELECT * FROM RESTAURANT_TABLE')
		test.is(data2.InUse, 0, 'Table is in use')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		table.Close()
	}
})

test('TABLE : UpdatedAt is updated', async(test) => {
	test.plan(1)
	const body = {
		CreatorId: 1
	}
	const table = await new Tables()
	try {
		await table.Create(body)
		const data1 = await table.db.get('SELECT * FROM RESTAURANT_TABLE')
		data1.InUse = 0
		await table.Modify(data1, data1.TableId)
		const data2 = await table.db.get('SELECT * FROM RESTAURANT_TABLE')
		const time = todaydate()
		test.is(data2.UpdatedAt, time, 'UpdatedAt was not updated')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		table.Close()
	}
})
