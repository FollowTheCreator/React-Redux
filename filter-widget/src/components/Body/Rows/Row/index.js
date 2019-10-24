import React from 'react';
import './style.css';

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
        });

        this.props.onRowClick(this.props.element.element);
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
                    {this.props.element.element.id}
                </span>
            </label>
        );
    }
}

export default Row;