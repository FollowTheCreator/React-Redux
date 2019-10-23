import React from 'react';
import './style.css';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.onMouseDown = this.onMouseDown.bind(this);
    }

    onMouseDown(e){
        this.props.onMouseDown(e);
    }

    render(){
        return(
            <div 
                className="drag-hook" 
                onMouseDown={this.onMouseDown}
            >
                {this.props.title}
            </div>
        );
    }
}

export default Header;