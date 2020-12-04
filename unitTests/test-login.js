import test from 'ava'
import Accounts from '../modules/builders/accounts.js'

test('LOGIN : invalid username', async(test) => {
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

		await account.Register(body)
		await account.Login('roej', 'password')
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'Login failed => Username "roej" not found',
			'incorrect error message'
		)
	} finally {
		account.Close()
	}
})

test('LOGIN : invalid password', async(test) => {
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
		await account.Register(body)
		await account.Login('doej', 'bad')
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'Login failed => Invalid password for account "doej"',
			'incorrect error message'
		)
	} finally {
		account.Close()
	}
})
