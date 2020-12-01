async function CommentChecker(comment,max) {
	if (typeof comment === 'string') {
		if (comment.length > max) throw new Error('Lenght of \'Comment\' is too long')
	}
}

async function StringChecker(String) {
	if (String === '') return true
	if (String === 'null' || String === null) return true
	return false
}

export { CommentChecker, StringChecker }
