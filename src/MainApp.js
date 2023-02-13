import React from "react";
import {useState} from "react";
import {evaluate} from "mathjs"
import "./App.css"

function InputButton(props) {
    return (
        <button onClick={props.onClick} className={`btn btn__${props.inputType}`}>
            {props.text}
        </button>
    );
}

function CalculationArea({input, output, isCalculated}) {
    return (
        <div className={"calculation-area"}>
            <div className={`calculation-area__input calculated__${isCalculated}--input`}>
                {input}
            </div>
            <div className={`calculation-area__output calculated__${isCalculated}--output`}>
                {output}
            </div>
        </div>
    );
}

export default function MainApp() {
    const [input, setInput] = useState("0");
    const [output, setOutput] = useState("0");

    const [isStart, setIsStart] = useState(true);
    const [isCalculated, setIsCalculated] = useState(false);

    function insertInputText(text){
        setIsCalculated(false);
        if (isStart){
            clearInput();
            setInput(text);
            setIsStart(false);
            try {
                setOutput(evaluate(text));
            }
            catch (e) {
                
            }
        }
        else{
            setInput(input + text);
            try {
                setOutput(evaluate(input + text));
            }
            catch (e) {
                
            }
        }
    }

    function getResult(){
        try {
            setOutput(evaluate(input));
        }
        catch (e) {
            
        }
        setIsCalculated(true);
        setIsStart(true);
    }

    function clearInput(){
        setInput("0");
        setOutput("0");
        setIsStart(true);
        setIsCalculated(false);
    }

    function deleteInput(){
        if (input.length === 1){
            clearInput();
            return;
        }
        else{
            setInput(input.slice(0, -1));
            try {
                setOutput(evaluate(input));
            }
            catch (e) {
                
            }
        }
    }

    return (
        <div className={"main-app"}>
            <CalculationArea input={input} output={output} isCalculated={isCalculated}/>
            <div className="btn__area">
                <div className="btn__area--row">
                    <InputButton
                        text={"DEL"}
                        inputType={"action"}
                        onClick={deleteInput}
                    />
                    <InputButton
                        text={"AC"}
                        inputType={"action"}
                        onClick={clearInput}

                    />
                    <InputButton
                        text={"("}
                        inputType={"operator"}
                        onClick={() => insertInputText("(")}
                    />
                    <InputButton
                        text={")"}
                        inputType={"operator"}
                        onClick={() => insertInputText(")")}
                    />
                </div>
                <div className="btn__area--row">
                    <InputButton
                        text={"7"}
                        inputType={"number"}
                        onClick={() => insertInputText("7")}
                    />
                    <InputButton
                        text={"8"}
                        inputType={"number"}
                        onClick={() => insertInputText("8")}
                    />
                    <InputButton
                        text={"9"}
                        inputType={"number"}
                        onClick={() => insertInputText("9")}
                    />
                    <InputButton
                        text={"+"}
                        inputType={"operator"}
                        onClick={() => insertInputText("+")}
                    />
                </div>
                <div className="btn__area--row">
                    <InputButton
                        text={"4"}
                        inputType={"number"}
                        onClick={() => insertInputText("4")}       
                    />
                    <InputButton
                        text={"5"}
                        inputType={"number"}
                        onClick={() => insertInputText("5")}
                    />
                    <InputButton
                        text={"6"}
                        inputType={"number"}
                        onClick={() => insertInputText("6")}
                    />
                    <InputButton
                        text={"-"}
                        inputType={"operator"}
                        onClick={() => insertInputText("-")}
                    />
                </div>
                <div className="btn__area--row">
                    <InputButton
                        text={"1"}
                        inputType={"number"}
                        onClick={() => insertInputText("1")}
                    />
                    <InputButton
                        text={"2"}
                        inputType={"number"}
                        onClick={() => insertInputText("2")}
                    />
                    <InputButton
                        text={"3"}
                        inputType={"number"}
                        onClick={() => insertInputText("3")}
                    />
                    <InputButton
                        text={"*"}
                        inputType={"operator"}
                        onClick={() => insertInputText("*")}
                    />
                </div>
                <div className="btn__area--row">
                    <InputButton
                        text={"0"}
                        inputType={"number"}
                        onClick={() => insertInputText("0")}
                    />
                    <InputButton
                        text={"."}
                        inputType={"number"}
                        onClick={() => insertInputText(".")}
                    />
                    <InputButton
                        text={"="}
                        inputType={"operator"}
                        onClick={getResult}
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