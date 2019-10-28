import React from 'react';
import './style.css';

class Search extends React.Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSearchTypeClick = this.onSearchTypeClick.bind(this);
    }

    onChange(e){
        this.props.onSearchChange(e.target.value);
    }

    onSearchTypeClick(type){
        this.props.onSearchTypeClick(type);
    }

    render(){
        const sortBy = this.props.sortAsc ? "A-Z" : "Z-A";

        return(
            <div className="search">
                <input onChange={this.onChange} className="search__input" placeholder="Search..." autoComplete="off"/>
                <div className="search-settings">
                    <div className="search-settings-filter search-settings-type">
                        <ul className="search-settings-filter-type-list">
                            <li className="search-settings-filter-type-list__item" onClick={() => this.onSearchTypeClick("_*_")}>
                                _*_
                            </li>
                            <li className="search-settings-filter-type-list__item" onClick={() => this.onSearchTypeClick("*_")}>
                                *_
                            </li>
                            <li className="search-settings-filter-type-list__item" onClick={() => this.onSearchTypeClick("*")}>
                                *
                            </li>
                        </ul>
                        {this.props.searchType}
                    </div>
                    <div 
                        className="search-settings-filter search-settings__sort" 
                        onClick={this.props.onSortClick}
                    >
                        {sortBy}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;