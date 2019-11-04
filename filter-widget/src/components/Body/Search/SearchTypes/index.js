import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

class SearchTypes extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const searchTypes = [];
        this.props.searchTypes.map(type => {
            searchTypes.push(
                <li 
                    key={type.value}
                    className="search-settings-filter-type-list__item" 
                    onClick={() => this.props.onSearchTypeClick(type.value)}
                >
                    {type.value}
                </li>
            );
        });

        return(
            <div className="search-settings-filter search-settings-type">
                <ul className="search-settings-filter-type-list">
                    {searchTypes}
                </ul>
                {this.props.searchType}
            </div>
        )
    }
}

SearchTypes.propTypes = {
    searchTypes: PropTypes.array.isRequired,
    searchType: PropTypes.string.isRequired,
    onSearchTypeClick: PropTypes.func.isRequired
}

export default SearchTypes;