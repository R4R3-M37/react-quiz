import React, { useContext } from 'react'
import Answer from './Answer'
import { QuizContext } from '../context/quiz'

const Question = () => {
	const [state, dispatch] = useContext(QuizContext)
	const currentQuestion = state.questions[state.currentQuestionId]

	return (
		<div>
			<div className={'question'}>{currentQuestion.question}</div>
			<div className={'answers'}>
				{state.answers.map((answer, index) => (
					<Answer
						index={index}
						answer={answer}
						currentAnswer={state.currentAnswer}
						correctAnswer={currentQuestion.correctAnswer}
						onSelectAnswer={(answer) => dispatch({ type: 'SELECT', payload: answer })}
						key={index}
					/>
				))}
			</div>
			<div className={'next-button'} onClick={() => dispatch({ type: 'NEXT' })}>
				Next question
			</div>
		</div>
	)
}

export default Question
