import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const Header = (props) => {
    return(
        <div 
            className="drag-hook" 
            onMouseDown={(e) => props.onMouseDown(e)}
        >
            {props.title}
        </div>
    );
}

Header.propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

Header.defaultProps = {
    onMouseDown: () => {},
    title: ""
}

export default Header;