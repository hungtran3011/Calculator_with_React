import React from "react";
import {useState} from "react";
import {evaluate} from "mathjs";
import "./App.css";

document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible") {
		document.title = "Simple calculator with React";
	} else {
		console.log("tab is inactive")
		document.title = "Come back to me!";
	}
});

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
	const [M, setM] = useState(0);

	function insertInputText(text) {
		if (isStart) {
			if (["+", "-", "*", "/"].includes(text) && isCalculated) {
				console.log(output)
				setInput(output + text);
				setIsStart(false);
				setIsCalculated(false);

			} else {
				clearInput();
				setInput(text);
				setIsStart(false);
				setIsCalculated(false);
			}
			try {
				setOutput(evaluate(text));

			} catch (e) {

			}
		} else {
			setInput(input + text);
			try {
				setOutput(evaluate(input + text));
			} catch (e) {

			}
		}
	}

	function getResult() {
		try {
			setOutput(evaluate(input));
			setIsCalculated(true);
			setIsStart(true);
		} catch (e) {

		}
	}

	function clearInput() {
		setInput("0");
		setOutput("0");
		setIsStart(true);
		setIsCalculated(false);
	}

	function deleteInput() {
		if (isCalculated) {
			clearInput();
			return;
		}
		if (input.length === 1) {
			clearInput();
		} else {
			setInput(input.slice(0, -1));
			try {
				setOutput(evaluate(input));
			} catch (e) {

			}
		}
	}

	function accumulate(input, isIncreased) {
		isIncreased ? setM(M + input) : setM(M - input);
		getResult();
		setInput(input + "M" + (isIncreased ? "+" : "-"));
	}

	function memoryClear() {
		setM(0);
		setInput("M");
		setOutput(M.toString());
		setIsCalculated(true);
		setIsStart(true);
	}

	function memoryRecall() {
		setInput("M");
		setOutput(M.toString());
		setIsCalculated(true);
		setIsStart(true);
	}

	const buttonsList = [
		["(", ")", "",  "",  "AC", "DEL"],
		["7", "8", "9", "+", "*",  "M+"],
		["4", "5", "6", "-", "/",  "M-"],
		["1", "2", "3", "!", "^",  "MR"],
		["",  "0", ".", "=", "%",  "MC"]
	]

	const buttons = buttonsList.map((row) => {
		const rowButtons = row.map((button) => {
			return ["+", "-", "*", "/", "^", "%", "!", "(", ")"].includes(button) ? <InputButton text={button} inputType={"operator"} onClick={() => insertInputText(button)}/> :
				"M+" === button ? <InputButton text={button} inputType={"action"} onClick={() => accumulate(output, true)}/> :
					"M-" === button ? <InputButton text={button} inputType={"action"} onClick={() => accumulate(output, false)}/> :
						"MR" === button ? <InputButton text={button} inputType={"action"} onClick={memoryRecall}/> :
							"MC" === button ? <InputButton text={button} inputType={"action"} onClick={memoryClear}/> :
								"DEL" === button ? <InputButton text={button} inputType={"action"} onClick={deleteInput}/> :
									"AC" === button ? <InputButton text={button} inputType={"action"} onClick={clearInput}/> :
										"=" === button ? <InputButton text={button} inputType={"operator"} onClick={getResult}/> :
											"" === button ? <div className={"btn btn__empty"}/> : <button onClick={() => insertInputText(button)} className={"btn btn__number"}>{button}</button>

		})
		return (
			<div className="btn__area--row">
				{rowButtons}
			</div>
		)
	})

	return (
		<div className={"main-app"}>
			<CalculationArea input={input} output={output} isCalculated={isCalculated}/>
			<div className="btn__area">
				{buttons}
			</div>
		</div>
	)
}