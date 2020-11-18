import test from 'ava'
import Accounts from '../modules/accounts.js'

test('LOGIN    : invalid username', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: 'doe',
		Birth: '1982-11-09',
		Password: 'password',
		PasswordValidation: 'password',
		Gender: 'Male',
		Position: 'Manager',
		Comment: 'Comment',
		Street: 'Address',
		City: 'City',
		Zip: 'Zip',
		Phone: '0949888999',
		Email: 'email@email.com'
	}
	const account = await new Accounts()
	try {

		await account.register(body)
		await account.login('roej', 'password')
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'username "roej" not found',
			'incorrect error message'
		)
	} finally {
		account.close()
	}
})

test('LOGIN    : invalid password', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: 'doe',
		Birth: '1982-11-09',
		Password: 'password',
		PasswordValidation: 'password',
		Gender: 'Male',
		Position: 'Manager',
		Comment: 'Comment',
		Street: 'Address',
		City: 'City',
		Zip: 'Zip',
		Phone: '0949888999',
		Email: 'email@email.com'
	}
	const account = await new Accounts()
	try {
		await account.register(body)
		await account.login('doej', 'bad')
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'invalid password for account "doej"',
			'incorrect error message'
		)
	} finally {
		account.close()
	}
})
