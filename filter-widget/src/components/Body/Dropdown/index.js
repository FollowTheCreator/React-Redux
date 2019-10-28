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
        const rows = this.props.rows
            .filter(row => row.checked)
            .map(row => row.element.id);
        const checkedRows = rows.length > 5 ? 
            rows.slice(0, 5).join(", ") + "..." :
            rows.join(", ");

        return(
            <div className="dropdown">
                <button className="dropdown-btn" onClick={this.onClick}>
                    <p className="dropdown-btn__title">
                        {this.props.title}
                    </p>
                    <p className="dropdown-btn__selected">
                        {checkedRows}
                    </p>
                </button>
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