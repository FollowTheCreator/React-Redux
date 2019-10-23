import React from 'react';
import './style.css';
import Contexts from './Contexts';
import Dimensions from './Dimensions';
import Search from './Search';
import Rows from './Rows';

class Body extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Contexts />
                <Dimensions />
                <Search />
                <Rows />
            </div>
        );
    }
}

export default Body;