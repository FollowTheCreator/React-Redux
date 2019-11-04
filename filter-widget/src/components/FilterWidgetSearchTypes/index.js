import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const SearchTypes = (props) => {
    const searchTypes = props.searchTypes.map(type => (
        <li
            key={type.value}
            className="search-settings-filter-type-list__item"
            onClick={() => props.onSearchTypeClick(type.value)}
        >
            {type.value}
        </li>
    ));

    return (
        <div className="search-settings-filter search-settings-type">
            <ul className="search-settings-filter-type-list">
                {searchTypes}
            </ul>
            {props.searchType}
        </div>
    );
}

SearchTypes.propTypes = {
    searchTypes: PropTypes.array.isRequired,
    searchType: PropTypes.string.isRequired,
    onSearchTypeClick: PropTypes.func.isRequired
}

SearchTypes.defaultProps = {
    searchTypes: [],
    searchType: "_*_",
    onSearchTypeClick: () => { }
}

export default SearchTypes;