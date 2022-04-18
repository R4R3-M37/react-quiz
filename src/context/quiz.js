import React, { createContext, useReducer } from 'react'
import questions from '../data'
import shuffle from '../js/shuffle'

const initialState = {
	questions,
	currentQuestionId: 0,
	showResults: false,
	answers: shuffle(questions[0]),
	currentAnswer: '',
	correctAnswersCount: 0,
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'NEXT': {
			const showResults = state.currentQuestionId === state.questions.length - 1
			const currentQuestionId = showResults ? state.currentQuestionId : state.currentQuestionId + 1
			const answers = showResults ? [] : shuffle(state.questions[currentQuestionId])
			return {
				...state,
				currentQuestionId,
				showResults,
				answers,
				currentAnswer: '',
			}
		}

		case 'SELECT': {
			const correctAnswersCount =
				action.payload === state.questions[state.currentQuestionId].correctAnswer
					? state.correctAnswersCount + 1
					: state.correctAnswersCount
			return {
				...state,
				currentAnswer: action.payload,
				correctAnswersCount,
			}
		}

		case 'RESTART':
			return {
				questions,
				currentQuestionId: 0,
				showResults: false,
				answers: shuffle(questions[0]),
				currentAnswer: '',
				correctAnswersCount: 0,
			}

		default:
			return {
				state,
			}
	}
}

const QuizContext = createContext()

const QuizProvider = ({ children }) => {
	const value = useReducer(reducer, initialState)
	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export { QuizContext, QuizProvider }
