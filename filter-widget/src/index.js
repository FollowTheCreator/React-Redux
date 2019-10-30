import React from  'react' ;
import ReactDOM from 'react-dom';
import App from './components';

const tables = document.getElementsByTagName("table");

ReactDOM.render(
    <App tables={tables}/>, 
    document.getElementById('root')
);