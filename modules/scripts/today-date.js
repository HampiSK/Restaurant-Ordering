const barrier = 10

function modifytime(ss,mn,hh) {
	if (ss < barrier) ss = `0${ss}`
	if (mn < barrier) mn = `0${mn}`
	if (hh < barrier) hh = `0${hh}`

	return `${hh}:${mn}:${ss}`
}

function modifydate(yyyy,mm,dd) {
	if (dd < barrier) dd = `0${dd}`
	if (mm < barrier) mm = `0${mm}`

	return `${yyyy}-${mm}-${dd}`
}

export default function todaydate(minage = 0) {
	const today = new Date()
	const dd = today.getDate()
	const mm = today.getMonth() + 1
	const ss = today.getSeconds()
	const mn = today.getMinutes()
	const hh = today.getHours()
	const yyyy = today.getFullYear() - minage

	return `${modifydate(yyyy,mm,dd)} ${modifytime(ss,mn,hh)}`
}
