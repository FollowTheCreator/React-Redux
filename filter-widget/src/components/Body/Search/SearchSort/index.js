import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const SearchSort = (props) => {
    return(
        <div 
            className="search-settings-filter search-settings__sort" 
            onClick={props.onSortClick}
        >
            {props.sortAsc ? "A-Z" : "Z-A"}
        </div>
    );
}

SearchSort.propTypes = {
    sortAsc: PropTypes.bool.isRequired,
    onSortClick: PropTypes.func.isRequired
}

SearchSort.defaultProps = {
    sortAsc: true,
    onSortClick: () => {}
}

export default SearchSort;