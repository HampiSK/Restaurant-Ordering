import test from 'ava'
import Tables from '../modules/builders/tables.js'
import todayDate from '../modules/scripts/today-date.js'

test('TABLE : Creating table with comment', async(test) => {
	test.plan(1)
	const body = {
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
			'Table was not created => Lenght of \'Comment\' is too long',
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
			'Table was not created => SQLITE_CONSTRAINT: NOT NULL constraint failed: RESTAURANT_TABLE.CreatorId',
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
		const time = await todayDate()
		test.is(data2.UpdatedAt, time, 'UpdatedAt was not updated')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		table.Close()
	}
})
