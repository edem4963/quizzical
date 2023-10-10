import { useEffect, useState } from "react"
import { decode } from "he"
import Answer from "./answer"


export default function Question(props){
    const [answer, setAnswer] = useState(props.answer)
    const [quiz, setQuiz] = useState(props.quiz)

    function selectAnswer(id) {
        setAnswer( prev => prev.map( ans => ans.id === id ? {...ans, selected: !ans.selected}: {...ans, selected: false}))
        setQuiz( prev => {
            return {...prev, answer_selected: id}
        })
        
      }

    useEffect(()=>{
        if(props.toggleScore && quiz.answer_selected === quiz.answer ){
            console.log("right")
            setAnswer( prev => prev.map( ans => ans.id === quiz.answer ? {...ans, correct: true }: ans ))
            props.updatePoint()
           
        } else if( props.toggleScore){
            console.log("wrong")
            setAnswer( prev => prev.map( ans => ans.id !== quiz.answer ? {...ans, correct: false }: ans ))
        }
        
    }, [props.toggleScore])

    const answerDisplay = answer
        .map((item, index) => <Answer key={index} choice={decode(item.value)} selected={props.toggleScore ?null:() => selectAnswer(item.id)} isSelected={item.selected} correct={item.correct} />)

    
                                      
      
    return (
        <div className="question">
            <p>{decode(quiz.question)}</p>
            <div className="question--answer ">
                {answerDisplay}
            </div>
        </div>
    )
}