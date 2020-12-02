//UNFINISHED

import fs from 'fs'

function getphoto(UserName) {
	let photo = 'A'
	try {
		if (fs.lstatSync(`/home/codio/workspace/public/images/users/${UserName}`).isFile()) {
			photo = `${UserName}`
			return photo
		}
	} catch(err) {
		return photo
	}
}

function uploadphoto(UserName) {
	fs.writeFile(`/home/codio/workspace/public/images/users/${UserName}`, 'Hello content!', (err) => {
		if (err) throw err
		console.log('Saved!')
	})
}

export { getphoto, uploadphoto}
