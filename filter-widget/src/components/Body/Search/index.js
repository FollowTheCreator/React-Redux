import React from 'react';
import './style.css';
import SearchTypes from './SearchTypes';
import SearchSort from './SearchSort';

class Search extends React.Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.props.onSearchChange(e.target.value);
    }

    render(){
        return(
            <div className="search">
                <input onChange={this.onChange} className="search__input" placeholder="Search..." autoComplete="off"/>
                <div className="search-settings">
                    <SearchTypes 
                        searchTypes={this.props.searchTypes} 
                        searchType={this.props.searchType} 
                        onSearchTypeClick={this.props.onSearchTypeClick}
                    />
                    <SearchSort 
                        sortAsc={this.props.sortAsc}
                        onSortClick={this.props.onSortClick}
                    />
                </div>
            </div>
        );
    }
}

export default Search;