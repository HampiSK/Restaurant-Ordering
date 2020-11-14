// (async (FirstName, LastName) => {
//   await CreateUserName(FirstName, LastName)
// })()

async function CreateUserName(FirstName, LastName) {
	try {
		let username = LastName.toLowerCase() + FirstName.toLowerCase()[0]
		let counter = 1
		while(true) {
			const sql = `SELECT COUNT(UserId) as records FROM USER WHERE UserName="${username}";`
			const data = await this.db.get(sql)
			if (data.records !== 0)
				username += counter.toString()
			else
				break

			counter++
		}
		return username
	} catch(err) {
		console.log(err)
	}
}

export default { CreateUserName }

// function AvaiabilityEmailCheck(Email) {
//     const sql = `SELECT COUNT(id) as records FROM users WHERE email="${Email}";`
//     const emails = await this.db.get(sql)
//     if (emails.records !== 0)
//         throw new Error(`email address "${Email}" is already in use`)
// }

// function JobCheck(Admin, Manager, Waiter, Chef) {
//     const JobFlags = [Admin, Manager, Waiter, Chef]
//     let flag = 0
//     let changed = false
//     for (let job of JobFlags) {
//         if (flag !== job)
//         {
//             if (changed)
//                 throw new Error('Error: Multiple job flags')
//             flag = job
//             changed = true;
//         }
//     }
//     if (flag === 0)
//         throw new Error('Error: Job flag cannot be 0')
// }

// export default function RegisterUser(FirstName, LastName, Gender, Birth, Email, Phone, Street, City, Zip,
//                                      Password, Admin, Manager, Waiter, Chef, CreatorId, Comment, saltRounds) {
//     Array.from(arguments).forEach((val) => {
//         if (val.length === 0) throw new Error('Error: Missing field to create')
//     })

//     const UserName = await CreateUserName(FirstName, LastName)
//     AvaiabilityEmailCheck(Email)
//     JobCheck(Admin, Manager, Waiter, Chef)
//     Password = await bcrypt.hash(Password, saltRounds)

//     const sql = `INSERT INTO USER(UserName, FirstName, LastName, Gender, Birth, Email, Phone, Street, City, Zip, Password, Admin, Manager, Waiter, Chef, CreatorId, Comment)
//                  VALUES("${UserName}", "${FirstName}", "${LastName}", "${Gender}", "${Birth}", "${Email}", "${Phone}", "${Street}", "${City}", "${Zip}", "${Password}", "${Admin}", "${Manager}", "${Waiter}", "${Chef}", "${CreatorId}", "${Comment}")`
//     await this.db.run(sql)
//     return true
// }
