import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.handleClick(this.props.pageToken);
    }

    render(){
        return(
            <button onClick={this.handleClick}>
                {this.props.value}
            </button>
        );
    }
}

Page.propTypes = {
    handleClick: PropTypes.func.isRequired,
    pageToken: PropTypes.string.isRequired,
    value: PropTypes.string
}

export default Page;