import React from 'react';
import './style.css';
import Row from '../FilterWidgetRow';
import PropTypes from 'prop-types';

const Rows = (props) => {
    return (
        <ul className="rows">
            {props.rows.map(row =>
                <li key={row.element.id}>
                    <Row onRowClick={props.onRowClick} row={row} />
                </li>
            )}
        </ul>
    );
}

Rows.propTypes = {
    rows: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired
}

Rows.defaultProps = {
    rows: [],
    onRowClick: () => { }
}

export default Rows;