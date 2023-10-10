import Question from './component/question'
import Start from './component/start'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [data, setData ] = useState([])
  const [start, setStart] = useState(false)
  const [score, setScore] = useState(false)
  const [point, setPoint] = useState(0)
  

// Pull data from api for random quiz question 
  useEffect(() => {

    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => data.results.map( i => {
                                        return {  question: i.question,
                                                  answer: i.correct_answer,
                                                  choice: i.incorrect_answers.concat([i.correct_answer]),
                                                  answer_selected: '',
                                                  id: Math.floor(Math.random()* 10000)
                                                 }
                                          }
                                    )
                                  )
    .then (data => setData (data))
  }, [])

  // to mix array of answer. if answer is true and false, alway have true first.
  function indexToObject(array) {
    
    const newArray= []
    
    for ( let i = 0; i< array.length; i++){
      newArray.push({value: array[i], selected: false, id: array[i], correct: ''})
    }

    if(newArray[0].value === "True" || newArray[0].value === "False"){
        newArray[0]={value:"True", selected: false, id: "True", correct: ''}
        newArray[1]={value:"False", selected: false, id: "False", correct: ''}
   } 
    else {
        newArray.sort(() => Math.random() - 0.5)
   }


    return newArray
  }

  // start the game function
  function startGame(){
    setStart(prevstart => !prevstart)
  }


  // use to start scoring system inside useffect in question component
  function toggleScore(){
 
      setScore(prevscore => !prevscore)
      
  }
  // use to add points system inside useffect in question component
  function updatePoint(){
    
    setPoint(prevPoint => prevPoint + 1)
  
  }
  // fetch and reset everything after grading of quiz
  const restartGame = async () => {
    const data = await(await (fetch("https://opentdb.com/api.php?amount=5"))).json()
    const newData = data.results.map( i => {
      return {  question: i.question,
                answer: i.correct_answer,
                choice: i.incorrect_answers.concat([i.correct_answer]),
                answer_selected: '',
                id: Math.floor(Math.random()* 10000)
               }
        }
  )
    setData(newData)
    setPoint(0)
    setScore(false)
  }


  
  // rendering question answer using useState data with question components
  const questionComponents = data.map((items, index) => {
                       return <Question key={items.id}
                                        id={items.id}  
                                        answer={indexToObject(items.choice)}
                                        quiz={{answer_selected: items.answer_selected, answer: items.answer, question: items.question}}
                                        updatePoint={updatePoint} 
                                        toggleScore={score}
                                        
                                />
                              })

  return start ? (
    <>
      {questionComponents}
      <div className='footer'>
        {score && <p>{point}/5</p>}
        <button onClick={score? restartGame : toggleScore} id='game-button' className='button in-game'>{score? "Start Over": "Check Answer"}</button> 
      </div>
    </>
  ) : <Start toggleStart={startGame}/>

}

export default App

