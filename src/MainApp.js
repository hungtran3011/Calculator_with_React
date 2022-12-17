import React from "react";
import {useState} from "react";
import "./App.css"

function InputButton(props) {
    return (
        <button onClick={props.onClick} className={`btn btn__input btn__${props.inputType}`}>
            {props.text}
        </button>
    );
}

function CalculationArea(props) {
    return (
        <div className={"calculation-area"}>
            <div className={"calculation-area__input"}>
                {props.input}
            </div>
            <div className={"calculation-area__output"}>
                {props.output}
            </div>
        </div>
    );
}

export default function MainApp() {
    function insertText(){

    }
    return (
        <div className={"main-app"}>
            <CalculationArea input={"0"} output={"0"}/>
            <div className="btn__area">
                <div className="btn__area--row">
                    <InputButton
                        text={"DEL"}
                        inputType={"action"}
                    />
                    <InputButton
                        text={"AC"}
                        inputType={"action"}

                    />
                    <InputButton
                        text={"("}
                        inputType={"operator"}
                    />
                    <InputButton
                        text={")"}
                        inputType={"operator"}
                    />
                </div>
                <div className="btn__area--row">
                    <InputButton
                        text={"7"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"8"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"9"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"+"}
                        inputType={"operator"}
                    />
                </div>
                <div className="btn__area--row">
                    <InputButton
                        text={"4"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"5"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"6"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"-"}
                        inputType={"operator"}
                    />
                </div>
                <div className="btn__area--row">
                    <InputButton
                        text={"1"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"2"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"3"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"*"}
                        inputType={"operator"}
                    />
                </div>
                <div className="btn__area--row">
                    <InputButton
                        text={"0"}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"."}
                        inputType={"number"}
                    />
                    <InputButton
                        text={"="}
                        inputType={"operator"}
                    />
                    <InputButton
                        text={"/"}
                        inputType={"operator"}
                    />
                </div>
            </div>

        </div>
    )
}