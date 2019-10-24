import React from 'react';
import './style.css';
import Rows from '../Rows';

class Dropdown extends React.Component{
    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            display: "none"
        }
    }

    onClick(){
        if(this.props.rows.length > 0){ 
            this.setState({
                display: this.state.display == "block" ? "none" : "block"
            });
        }
    }

    render(){
        return(
            <div className="dropdown">
                <div className="dropdown-btn" onClick={this.onClick}>
                    <p className="dropdown-btn__title">
                        {this.props.title}
                    </p>
                </div>
                <div
                    style={{
                        display: this.state.display
                    }}
                    className="dropdown-content"
                >
                    <Rows onRowClick={this.props.onRowClick} rows={this.props.rows} />
                </div>
            </div>
        );
    }
}

export default Dropdown;