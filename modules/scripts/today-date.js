export default function todaydate(minage = 0) {
	const today = new Date()
	let dd = today.getDate()
	let mm = today.getMonth() + 1
	const yyyy = today.getFullYear() - minage
	const barrier = 10
	if (dd < barrier) {
		dd = `0${dd}`
	}
	if (mm < barrier) {
		mm = `0${mm}`
	}
	return `${yyyy}-${mm}-${dd}`
}
