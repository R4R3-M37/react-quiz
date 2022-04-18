import React, { useContext, useEffect, useState } from 'react'
import Question from './components/Question'
import { QuizContext } from './context/quiz'

const App = () => {
	const [state, dispatch] = useContext(QuizContext)
	const [isModalActive, setIsModalActive] = useState(false)
	const [isCategoryActive, setIsCategoryActive] = useState(false)
	const [difficulty, setDifficulty] = useState('easy')
	const [category, setCategory] = useState('15')
	const apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`

	const setEase = () => {
		setDifficulty('easy')
		dispatch({ type: 'RESTART' })
	}

	const setMedium = () => {
		setDifficulty('medium')
		dispatch({ type: 'RESTART' })
	}

	const setHard = () => {
		setDifficulty('hard')
		dispatch({ type: 'RESTART' })
	}

	const setAnime = () => {
		setCategory('31')
		dispatch({ type: 'RESTART' })
	}

	const setGames = () => {
		setCategory('15')
		dispatch({ type: 'RESTART' })
	}

	const setMusic = () => {
		setCategory('12')
		dispatch({ type: 'RESTART' })
	}

	useEffect(() => {
		if (state.questions.length > 0) {
			return
		}
		console.log(apiUrl)
		fetch(apiUrl)
			.then((res) => res.json())
			.then((data) => {
				dispatch({ type: 'LOADED', payload: data.results })
			})
	})

	return (
		<div className={'quiz'}>
			{state.showResults && (
				<div className={'results'}>
					<div className={'congratulations'}>Congratulations</div>
					<div className={'results-info'}>
						<div>You have completed the quiz</div>
						<div>
							You have got {state.correctAnswersCount} of {state.questions.length}
						</div>
						<div style={{ display: 'flex' }}>
							<div className={'next-button'} onClick={() => setIsModalActive(!isModalActive)}>
								Change difficulty and restart
								{isModalActive && (
									<div style={{ display: 'flex' }}>
										<button className={'change-button'} onClick={setEase}>
											Ease
										</button>
										<button className={'change-button'} onClick={setMedium}>
											Medium
										</button>
										<button className={'change-button'} onClick={setHard}>
											Hard
										</button>
									</div>
								)}
							</div>
							<div className={'next-button'} onClick={() => setIsCategoryActive(!isCategoryActive)}>
								Change category and restart
								{isCategoryActive && (
									<div style={{ display: 'flex' }}>
										<button className={'change-button'} onClick={setAnime}>
											Anime and manga
										</button>
										<button className={'change-button'} onClick={setGames}>
											Video games
										</button>
										<button className={'change-button'} onClick={setMusic}>
											Music
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
			{!state.showResults && state.questions.length > 0 && (
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
