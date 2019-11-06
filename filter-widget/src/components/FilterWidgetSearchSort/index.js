import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const FilterWidgetSearchSort = (props) => {
    return (
        <div
            className="search-settings-filter search-settings__sort"
            onClick={props.onSortClick}
        >
            {props.sortAsc ? "A-Z" : "Z-A"}
        </div>
    );
}

FilterWidgetSearchSort.propTypes = {
    sortAsc: PropTypes.bool.isRequired,
    onSortClick: PropTypes.func.isRequired
}

FilterWidgetSearchSort.defaultProps = {
    sortAsc: true,
    onSortClick: () => { }
}

export default FilterWidgetSearchSort;