import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

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

Header.propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

export default Header;