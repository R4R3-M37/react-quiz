const normalizeQuiz = (backendQuestions) => {
	return backendQuestions.map((backendQuestion) => {
		return {
			correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
			question: decodeURIComponent(backendQuestion.question),
			incorrectAnswers: backendQuestion.incorrect_answers.map((incorrectAnswers) =>
				decodeURIComponent(incorrectAnswers)
			),
		}
	})
}

export default normalizeQuiz
