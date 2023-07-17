import React, { useEffect, useState } from "react";
import classNames from 'classnames';

const LetterBox = (props) => {
    
    return (
        <div className="letter-box">{props.letter}</div>
    )
}

export default LetterBox;