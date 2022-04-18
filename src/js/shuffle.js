const shuffle = (q) => {
	const unshuffledAnswers = [q.correctAnswer, ...q.incorrectAnswers]
	return unshuffledAnswers
		.map((unshuffledAnswers) => ({ sort: Math.random(), value: unshuffledAnswers }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value)
}

export default shuffle
