import React, { useContext } from "react";
import Key from "./key";
import { AppContext } from "./App";
import { useCallback, useEffect } from "react";

const Keyboard = () => {
    const keys1 = ["Q","W","E","R","T","Y","U","I","O","P"];
    const keys2 = ["A","S","D","F","G","H","J","K","L"];
    const keys3 = ["Z","X","C","V","B","N","M"];

    const {onDelete, onEnter, onKeyPress} = useContext(AppContext);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter"){
            onEnter()
        } else if (e.key === "Backspace"){
            onDelete()
        } else {
            onKeyPress(e.key)
        }
    })

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    },[handleKeyDown])

    return (
        <div className="keyboard" onKeyDown={handleKeyDown}>
            {keys1.map((key)=><Key keyVal={key}/>)}
            <div className="space"></div>
            {keys2.map((key)=><Key keyVal={key}/>)}
            <div className="space"></div>
            <Key keyVal={"ENTER"} isLarge={true}/>
            {keys3.map((key)=><Key keyVal={key}/>)}
            <Key keyVal={"DELETE"} isLarge={true}/>

        </div>
    )
}

export default Keyboard;