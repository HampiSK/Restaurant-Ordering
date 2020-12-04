import test from 'ava'
import Accounts from '../modules/builders/accounts.js'

//                     FirstName: 'j',
//                     LastName: 'doe',
//                     Birth: '1982-11-09',
//                     Password: 'password',
//                     PasswordValidation: 'password',
//                     Gender: 'Male',
//                     Position: 'Manager',
//                     Comment: 'Comment',
//                     Street: 'Address',
//                     City: 'City',
//                     Zip: 'Zip',
//                     Phone: '0949888999',
//                     Email: 'email@email.com'
test('REGISTER : register and log in with a valid account', async(test) => {
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
	const account = await new Accounts() // no database specified so runs in-memory
	try {
		await account.Register(body)
		const login = await account.Login('doej', 'password')
		test.is(login, true, 'unable to log in')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		account.Close()
	}
})

test('REGISTER : register and log in with "special" valid account', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j   ',
		LastName: '  doe  ',
		Birth: '1982-11-09',
		Password: 'password',
		PasswordValidation: 'password',
		Gender: 'Male',
		Position: 'Manager',
		Comment: 'Comment; DROP TABLE USER;',
		Street: 'DELETE FROM USER;',
		City: 'City; DROP TABLE USER\;',
		Zip: ';DROP TABLE USER\;',
		Phone: '0949888999',
		Email: '   email@email.com;DROP TABLE USER;\ '
	}
	const account = await new Accounts() // no database specified so runs in-memory
	try {
		await account.Register(body)
		const login = await account.Login('doej', 'password')
		test.is(login, true, 'unable to log in')
	} catch (err) {
		test.fail('error thrown')
	} finally {
		account.Close()
	}
})

test('REGISTER : register with same name x2', async(test) => {
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
		Email: ''
	}
	const user1 = {
		...body
	}
	const user2 = {
		...body
	}
	const account = await new Accounts()
	try {
		await account.Register(user1)
		await account.Register(user2)
		const login = await account.Login('doej0', 'password')

		test.is(login, true, 'doej0 was not able to login')
	} catch (err) {
		test.is(
			test.fail('error thrown')
		)
	} finally {
		account.Close()
	}
})

test('REGISTER : register with same name x12', async(test) => {
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
		Email: ''
	}

	const account = await new Accounts()
	let counter = 0

	try {
		while (counter !== 12) {
			const user = {
				...body
			}
			await account.Register(user)
			counter++
		}
		const login = await account.Login('doej10', 'password')
		test.is(login, true, 'doej10 was not able to login')
	} catch (err) {
		test.is(
			test.fail('error thrown')
		)
	} finally {
		account.Close()
	}
})

test('REGISTER : register a duplicate email', async(test) => {
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
	const user1 = {
		...body
	}
	const user2 = {
		...body
	}
	const account = await new Accounts()
	try {
		await account.Register(user1)
		await account.Register(user2)
		test.fail('error not thrown')
	} catch (err) {
		test.is(
			err.message,
			'User was not created => EmailCheck(): Email address "email@email.com" is already in use',
			'incorrect error message'
		)
	} finally {
		account.Close()
	}
})

test('REGISTER : error if First name too long', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => CheckLenght(): Lenght of \'FirstName\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if Last name too long', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => CheckLenght(): Lenght of \'LastName\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if Birth too long', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: 'doe',
		Birth: '1982-11-091982-11-091982-11-091982-11-091982-11-091982-11-091982-11-091982-11-09',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => CheckLenght(): Lenght of \'Birth\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if Password too long', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: 'doe',
		Birth: '1982-11-09',
		Password: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => Password(): Lenght of \'Password\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if Gender too long', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: 'doe',
		Birth: '1982-11-09',
		Password: 'password',
		PasswordValidation: 'password',
		Gender: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => CheckLenght(): Lenght of \'Gender\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if Position too long', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: 'doe',
		Birth: '1982-11-09',
		Password: 'password',
		PasswordValidation: 'password',
		Gender: 'Male',
		Position: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => Jobs(): Lenght of \'Position\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if Street too long', async(test) => {
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
		Street: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong',
		City: 'City',
		Zip: 'Zip',
		Phone: '0949888999',
		Email: 'email@email.com'
	}
	const account = await new Accounts()
	try {
		await account.Register(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => CheckLenght(): Lenght of \'Street\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if City too long', async(test) => {
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
		City: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong',
		Zip: 'Zip',
		Phone: '0949888999',
		Email: 'email@email.com'
	}
	const account = await new Accounts()
	try {
		await account.Register(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => CheckLenght(): Lenght of \'City\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if Zip too long', async(test) => {
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
		Zip: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong',
		Phone: '0949888999',
		Email: 'email@email.com'
	}
	const account = await new Accounts()
	try {
		await account.Register(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => CheckLenght(): Lenght of \'Zip\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if Phone too long', async(test) => {
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
		Phone: '094988899909498889990949888999094988899909498889990949888999',
		Email: 'email@email.com'
	}
	const account = await new Accounts()
	try {
		await account.Register(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => CheckLenght(): Lenght of \'Phone\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if Email too long', async(test) => {
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
		Email: 'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong@email.com'
	}
	const account = await new Accounts()
	try {
		await account.Register(body)
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => CheckLenght(): Lenght of \'Email\' is too long',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if blank First name', async(test) => {
	test.plan(1)
	const body = {
		FirstName: '    ',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => SQLITE_CONSTRAINT: NOT NULL constraint failed: USER.FirstName',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if invalid password', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: 'doe',
		Birth: '1982-11-09',
		Password: '    ',
		PasswordValidation: '    ',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => Password(): Password is not accepted.', 'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if blank Last name', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: '     ',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => SQLITE_CONSTRAINT: NOT NULL constraint failed: USER.LastName',
			'incorrect error message')
	} finally {
		account.Close()
	}
})

test('REGISTER : error if blank password', async(test) => {
	test.plan(1)
	const body = {
		FirstName: 'j',
		LastName: 'doe',
		Birth: '1982-11-09',
		Password: '',
		PasswordValidation: '',
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
		test.fail('error not thrown')
	} catch (err) {
		test.is(err.message,
			'User was not created => Password(): Password is not accepted.',
			'incorrect error message')
	} finally {
		account.Close()
	}
})
