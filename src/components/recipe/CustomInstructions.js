import React from "react";
import { AppContext } from "../../state/context";



export default function CustomInstructions () {
    const { globalState } = React.useContext(AppContext);
    
    const instructions = globalState.customInstructions

    return (
        <div>
            <h3>{instructions.length ? 'Instructions' : ''}</h3>
            <ul>
                {instructions.length ? instructions.map((step, idx) => {
                return <li key={idx}>{step}</li>
            }) : ''}
            </ul>
        </div>
    )
}