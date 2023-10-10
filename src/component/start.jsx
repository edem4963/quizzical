export default function Start(props){
    
    return(
    <div className='intro-page' onClick={props.toggleStart}>
        <h1>Quiz Game</h1>
        <p>Some description if needed</p>
        <button className='button start'>Start Quiz</button>
    </div>
    )
}