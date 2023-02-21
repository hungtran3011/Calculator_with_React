/*
This is my attempt to create a React calculator using Hooks
The computation is done using mathjs library, instead of using eval() function or building my own parser
The components are:
- InputButton: the buttons that are used to input numbers and operators
- CalculationArea: the area that displays the input and the output
- MainApp: the main component that contains all the other components
*/

import React from "react";
import {useState} from "react";
import {evaluate} from "mathjs";
import "./App.css";

/*
Funny feature: when the tab is inactive, the title will change to "Come back to me!"
*/
document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible") {
		document.title = "Simple calculator with React";
	} else {
		console.log("tab is inactive")
		document.title = "Come back to me!";
	}
});

function InputButton(props) {
	/*
	The basic component: buttons
	There are 3 types of buttons:
	- Numbers and operators (including decimal point): These buttons will call the insertInputText() function when clicked
	- Actions: clear, delete, equal and memory (M+, M-, MR, MC):
	*/
	return (
		<button onClick={props.onClick} className={`btn btn__${props.inputType}`}>
			{props.text}
		</button>
	);
}

function CalculationArea({input, output, isCalculated}) {
	/*
	The component that displays the input and the output
	Animate the input and output area when the user has just calculated the result
	*/
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
	// isStart is used to check if the user is starting a new calculation
	// This is used to prevent the user from inputting new numbers after the result is calculated
	// For example, if the user has just calculated 1 + 1 = 2, and the user wants to calculate 2 + 2 = 4
	// The user should not be able to input 2 + 2 + 2 = 6
	// Instead, the user should be able to input 2 + 2 = 4, and then input 4 + 2 = 6
	// Another example: if the user has just calculated 1 + 1 = 2, and the user wants to calculate 8 / 2 = 4
	// The user should not be able to input 1 + 18/2 = 10
	const [isStart, setIsStart] = useState(true);
	// isCalculated is used to check if the user has just calculated the result
	// Different to isStart, isCalculated can only be true after user has clicked the equal button
	// so that the user can continue to continue the calculation by just inputting the operator
	// For example, if the user has just calculated 1 + 1 = 2, and the user wants to calculate 2 + 2 = 4
	// The user should be able to input 2 + 2 = 4, and then input + 2 = 6
	// isCalculated is also used for changing the style of the input and output area by changing the class name of the divs
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
		/*
		Delete the last character of the input
		If the input is empty, do nothing
		If the input is just 1 character, clear the input
		*/
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
		/*
		Function for M+/M- buttons
		The value of M will be increased/decreased by the current input based on the isIncreased parameter
		*/
		isIncreased ? setM(M + input) : setM(M - input);
		getResult();
		setInput(input + "M" + (isIncreased ? "+" : "-"));
	}

	function memoryClear() {
		/*
		Function for MC button
		The value of M will be set to 0
		*/
		setM(0);
		setInput("M");
		setOutput(M.toString());
		setIsCalculated(true);
		setIsStart(true);
	}

	function memoryRecall() {
		/*
		Function for MR button
		The value of M will be set to the current input
		 */
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

	/*
	* Map the buttonsList to create the buttons and assign the onClick function to each button
	* Also create the rows of buttons
	*/
	const buttons = buttonsList.map((row) => {
		const rowButtons = row.map((button) => {
			return ["+", "-", "*", "/", "^", "%", "!", "(", ")"].includes(button) ?
				<InputButton text={button} inputType={"operator"} onClick={() => insertInputText(button)}/> :
				"M+" === button ? <InputButton text={button} inputType={"action"} onClick={() => accumulate(output, true)}/> :
				"M-" === button ? <InputButton text={button} inputType={"action"} onClick={() => accumulate(output, false)}/> :
				"MR" === button ? <InputButton text={button} inputType={"action"} onClick={memoryRecall}/> :
				"MC" === button ? <InputButton text={button} inputType={"action"} onClick={memoryClear}/> :
				"DEL" === button ? <InputButton text={button} inputType={"action"} onClick={deleteInput}/> :
				"AC" === button ? <InputButton text={button} inputType={"action"} onClick={clearInput}/> :
				"=" === button ? <InputButton text={button} inputType={"operator"} onClick={getResult}/> :
				"" === button ? <div className={"btn btn__empty"}/> :
				<button onClick={() => insertInputText(button)} className={"btn btn__number"}>
					{button}
				</button>

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