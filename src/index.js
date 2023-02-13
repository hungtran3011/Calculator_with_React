import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from './MainApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <h1>My calculator</h1>
        <h3>using React</h3>
        <MainApp />
        <footer>
            <p>© Copyright 2022 by Andrew. All Rights Reserved</p>
            <p>Contact me at <a href={"mailto: hungtran30112004@gmail.com"}>hungtran30112004@gmail.com</a></p>
            <p>View code on GitHub: <a href={"https://github.com/hungtran3011/Calculator_with_React"} title={"View the GitHub repo"}>
                here
            </a>
            </p>
        </footer>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
