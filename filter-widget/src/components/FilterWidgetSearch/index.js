import React from 'react';
import './style.css';
import SearchTypes from '../FilterWidgetSearchTypes';
import SearchSort from '../FilterWidgetSearchSort';
import PropTypes from 'prop-types';

const Search = (props) => {
    let inputRef = React.createRef();

    const onChange = () => {
        props.onSearchChange(inputRef.current.value);
    }

    return (
        <div className="search">
            <input ref={inputRef} onChange={onChange} className="search__input" placeholder="Search..." autoComplete="off" />
            <div className="search-settings">
                <SearchTypes
                    searchTypes={props.searchTypes}
                    searchType={props.searchType}
                    onSearchTypeClick={props.onSearchTypeClick}
                />
                <SearchSort
                    sortAsc={props.sortAsc}
                    onSortClick={props.onSortClick}
                />
            </div>
        </div>
    );
}

Search.propTypes = {
    searchTypes: PropTypes.array.isRequired,
    searchType: PropTypes.string.isRequired,
    onSearchTypeClick: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onSortClick: PropTypes.func.isRequired,
    sortAsc: PropTypes.bool.isRequired
}

Search.defaultProps = {
    searchTypes: [],
    searchType: "_*_",
    onSearchTypeClick: () => { },
    onSearchChange: () => { },
    onSortClick: () => { },
    sortAsc: true
}

export default Search;