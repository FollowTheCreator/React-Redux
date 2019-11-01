import React from 'react';
import './style.css';
import Row from './Row';
import PropTypes from 'prop-types';

class Rows extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const rows = 
        <ul className="rows">
            {this.props.rows.map(row => 
                <li key={row.element.id}>
                    <Row onRowClick={this.props.onRowClick} row={row} />
                </li>
            )}
        </ul>;

        return(
            rows
        );
    }
}

Rows.propTypes = {
    rows: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired
}

export default Rows;