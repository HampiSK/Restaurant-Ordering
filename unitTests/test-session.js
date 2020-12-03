import test from 'ava'
import ctxSession from '../modules/ctx/session.js'


test('SESSION : user not authorised', async(test) => {
	test.plan(1)
	try {
		const body = ctxSession()
		test.is(body.authorised, false, 'body.authorised is not false')
	} catch (err) {
		test.fail('error thrown')
	}
})

test('SESSION : user is authorised', async(test) => {
	test.plan(1)
	try {
		const body = {
			UserId: 1,
			UserName: 'doej'
		}
		const ans = ctxSession(body)
		test.is(ans.authorised, true, 'body.authorised is not false')
	} catch (err) {
		test.fail('error thrown')
	}
})
