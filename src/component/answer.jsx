

export default function Answer(props) {
    
    let highlight

    if( props.correct){
        highlight= "correct"
    } else if (props.correct === false){
        highlight = "incorrect"
    } else {
        highlight = ""
    }
    
    return (
        <div onClick={props.selected} className={`answer ${props.isSelected? `selected ${highlight}`  : "" } `} >    
            <p>{props.choice}</p>
        </div>
    )
}