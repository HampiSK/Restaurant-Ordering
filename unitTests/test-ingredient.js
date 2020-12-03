import test from 'ava'
import Ingredients from '../modules/ingredients.js'
import todayDate from '../modules/scripts/today-date.js'

// \'IngredientId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
//                 \'Title\' VARCHAR(75) NOT NULL UNIQUE,\
//                 \'Type\' VARCHAR(30) NOT NULL,\
//                 \'Quantity\' FLOAT NOT NULL DEFAULT 0,\
//                 \'Unit\'  SMALLINT(6) NOT NULL DEFAULT 0,\
//                 \'Price\' FLOAT NOT NULL DEFAULT 0,\
//                 \'CreatorId\' INTEGER NOT NULL,\
//                 \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
//                 \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
//                 \'Comment\' TEXT NULL DEFAULT NULL\

test('INGREDIENT : Title not unique', async(test) => {
	test.plan(1)
	const body = {
		Title: 'Potato',
		Type: 'Vegetable',
		CreatorId: 1,
		Comment: 'Comment'
	}
	const ingredient = await new Ingredients()
	try {
		await ingredient.Create(body)
		await ingredient.Create(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'Ingredient was not created => SQLITE_CONSTRAINT: UNIQUE constraint failed: INGREDIENT.Title',
			'incorrect error message'
		)
	} finally {
		ingredient.Close()
	}
})

test('INGREDIENT : Creating ingredient', async(test) => {
	test.plan(1)
	const body = {
		Title: 'Potato',
		Type: 'Vegetable',
		CreatorId: 1,
		Comment: 'Comment'
	}
	const ingredient = await new Ingredients()
	try {
		const checker = await ingredient.Create(body)
		test.is(checker, true, 'Ingredient was not created')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		ingredient.Close()
	}
})

test('INGREDIENT : Comment too long', async(test) => {
	test.plan(1)
	const text = 'TooLong'
	const body = {
		CreatorId: 1,
		Comment: text.repeat(150)
	}
	const ingredient = await new Ingredients()
	try {
		await ingredient.Create(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'Ingredient was not created => CheckLenght(): Lenght of \'Comment\' is too long',
			'incorrect error message'
		)
	} finally {
		ingredient.Close()
	}
})

test('INGREDIENT : Invalid creation of ingredient', async(test) => {
	test.plan(1)
	const body = {
		Comment: 'Comment'
	}
	const ingredient = await new Ingredients()
	try {
		await ingredient.Create(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'Ingredient was not created => SQLITE_CONSTRAINT: NOT NULL constraint failed: INGREDIENT.Title',
			'incorrect error message'
		)
	} finally {
		ingredient.Close()
	}
})


test('INGREDIENT : UpdatedAt is updated', async(test) => {
	test.plan(1)
	const body = {
		Title: 'Potato',
		Type: 'Fruit',
		CreatorId: 1,
		Comment: 'Comment'
	}
	const ingredient = await new Ingredients()
	try {
		await ingredient.Create(body)
		const data1 = await ingredient.db.get('SELECT * FROM INGREDIENT')
		data1.Type = 'Vegetable'
		await ingredient.Modify(data1, data1.IngredientId)
		const data2 = await ingredient.db.get('SELECT * FROM INGREDIENT')
		const time = await todayDate()
		test.is(data2.UpdatedAt, time, 'UpdatedAt was not updated')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		ingredient.Close()
	}
})
