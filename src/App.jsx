import React, { useContext, useEffect } from 'react'
import Question from './components/Question'
import { QuizContext } from './context/quiz'

const App = () => {
	const [state, dispatch] = useContext(QuizContext)

	return (
		<div className={'quiz'}>
			{state.showResults && (
				<div className={'results'}>
					<div className={'congratulations'}>Congratulations</div>
					<div className={'results-info'}>
						<div>You have complited the quiz</div>
						<div>You have got {state.correctAnswersCount} of 8</div>
						<div className={'next-button'} onClick={() => dispatch({ type: 'RESTART' })}>
							Retry
						</div>
					</div>
				</div>
			)}
			{!state.showResults && (
				<div>
					<div className={'score'}>
						Question {state.currentQuestionId + 1}/{state.questions.length}
					</div>
					<Question />
				</div>
			)}
		</div>
	)
}

export default App
