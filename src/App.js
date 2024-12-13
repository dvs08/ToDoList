import React from 'react';
import ReactDOM from 'react-dom'; //react implementation to manipulate DOM
import 'normalize.css/normalize.css';
import './styles/AddTaskForm.css';
import '@innovaccer/design-system/css';
// import { createRoot } from 'react-dom/client';
import MainToDo from './components/MainToDo';

const App = () => <MainToDo />;

// const root = createRoot(document.getElementById('app'));

// root.render(<App />);

ReactDOM.render(<App/>, document.getElementById('app'));  //ReactDOM: React makes a virtual DOM which compares with the actual dom and then only updates the changes made in the Virtual to the Original
 

/*
1.CreateRoot(), method to create Root in ReactDOM. Selects an element from the HTML where the render should happen. Behind the scene it creates a 
complete new DOM like structure. It creates so it can comare its dom with the main dom only update the things which are changed in the UI. 
But the browser re-paints the DOM (re structure).

React Fiber Architecture: 

    Reconciliation: Virtual DOM: 2 differing algos
    seSTate(): Re-render: A new tree is diffed with the previous tree to compute which operations are needed to update the renderd app/
    Diffing of lists is performed using Keys. Keys should be stable, predictable, and unique
 */

//Render().Function to render the JSX onto the DOM