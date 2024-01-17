import React from "react";
import { AppContext } from "../../state/context";
// import test_data from "../../data/placeHolder_data.json"


export default function Instructions () {
    const { globalState } = React.useContext(AppContext);
    // const instructions = test_data.Recipe.Instructions
    const instructions = globalState.instructions

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