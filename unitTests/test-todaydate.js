import test from 'ava'
import todayDate from '../modules/scripts/today-date.js'

test('TODAYDATE : time is less then 0', async(test) => {
	test.plan(1)
	try {
		await todayDate(-10)
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,'Something went wrong in todayDate() => Value \'minAge\' is less then 0')
	}
})

test('TODAYDATE : time is more then 200', async(test) => {
	test.plan(1)
	try {
		await todayDate(2000)
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,'Something went wrong in todayDate() => Value \'minAge\' is more then \'200\'')
	}
})
