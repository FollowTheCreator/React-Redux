import React from 'react';
import './style.css';
import Row from './Row';

class Rows extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const rows = 
        <ul className="rows">
            {this.props.rows.map(row => 
                <li key={row.element.id}>
                    <Row onRowClick={this.props.onRowClick} element={row} />
                </li>
            )}
        </ul>;

        return(
            rows
        );
    }
}

export default Rows;