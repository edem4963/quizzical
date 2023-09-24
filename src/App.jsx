import Question from './component/question'
import Start from './component/start'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [quiz, setQuiz ] = useState([])
  
  
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1")
    .then(res => res.json())
    .then(data => setQuiz(data.results))
}, [])

 

  const q = quiz.map((items, index) => {
                      return <Question  key={index} 
                                        question={items.question} 
                                        answer={[items.correct_answer].concat(items.incorrect_answers)} 
                              />
                    })
  return (
    <>
      {q}
      
    </>
  )
}

export default App

/*   useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => setQuiz(data.results))
  }, []) */