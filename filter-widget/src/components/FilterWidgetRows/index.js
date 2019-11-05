import React from 'react';
import './style.css';
import Row from '../FilterWidgetRow';
import PropTypes from 'prop-types';

const FilterWidgetRows = (props) => {
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

FilterWidgetRows.propTypes = {
    rows: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired
}

FilterWidgetRows.defaultProps = {
    rows: [],
    onRowClick: () => { }
}

export default FilterWidgetRows;