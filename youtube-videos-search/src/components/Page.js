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
        let className = "btn btn-outline-secondary";
        if(this.props.display){
            className += " d-inline";
        }
        else{
            className += " d-none";
        }

        return(
            <button className={className} onClick={this.handleClick}>
                {this.props.value}
            </button>
        );
    }
}

Page.propTypes = {
    handleClick: PropTypes.func.isRequired,
    pageToken: PropTypes.string.isRequired,
    value: PropTypes.string,
    display: PropTypes.bool.isRequired
}

export default Page;