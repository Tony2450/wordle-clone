import React from "react";
import LetterBox from "./Letter-box";
import classNames from 'classnames';

const WordRow = (props) => {
    return(
        <div className="word-row">
            <LetterBox letter={props.rowArray[0]}/>
            <LetterBox letter={props.rowArray[1]}/>
            <LetterBox letter={props.rowArray[2]}/>
            <LetterBox letter={props.rowArray[3]}/>
            <LetterBox letter={props.rowArray[4]}/>
        </div>
    )
}

export default WordRow;