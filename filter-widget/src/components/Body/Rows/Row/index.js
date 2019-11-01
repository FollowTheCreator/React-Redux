import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

class Row extends React.Component{
    constructor(props){
        super(props);

        this.state={
            checked: false
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({
            checked: !this.state.checked
        },
        () => {
            this.props.onRowClick(this.props.row, this.state.checked);
        });
    }

    render(){
        return(
            <label className="row" onClick={this.onClick}>
                <div className="row-checkbox">
                    <div 
                        className="row-checkbox__mark" 
                        style={{display: this.state.checked ? "block" : "none"}}
                    ></div>
                </div>
                <span className="row__title">
                    {this.props.row.element.id}
                </span>
            </label>
        );
    }
}

Row.propTypes = {
    onRowClick: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired
}

export default Row;