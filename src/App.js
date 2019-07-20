import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import {Summary} from "./Summary";
import {history} from "./store";

export default function App() {

    return (
        <ConnectedRouter history={history}>
            <Route exact path="/" component={Summary}/>
        </ConnectedRouter>
    );
};
