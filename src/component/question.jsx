import { useState } from "react"
import Answer from "./answer"


export default function Question(props){
    const [answer, setAnswer] = useState(props.answer)
    console.log(answer)
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        
        while (currentIndex > 0) {
      
          
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      
      shuffle(answer);
      
    return (
        <div className="question">
            <p>{props.question}</p>
            <div className="question--answer ">
                {answer.map((item, index) => <Answer key={index} choice={item}/>)}
            </div>
        </div>
    )
}