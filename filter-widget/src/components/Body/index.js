import React from 'react';
import './style.css';
import Dropdown from './Dropdown';
import Search from './Search';
import Rows from './Rows';
import StateStorage from './StateStorage';
import Utils from '../../Services/Utils';

class Body extends React.Component{
    constructor(props){
        super(props);

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onContextClick = this.onContextClick.bind(this);
        this.onDimensionClick = this.onDimensionClick.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.onSortClick = this.onSortClick.bind(this);
        this.onSearchTypeClick = this.onSearchTypeClick.bind(this);
        this.search = this.search.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onRestoreClick = this.onRestoreClick.bind(this);
        this.getDefaultSearchTypeValue = this.getDefaultSearchTypeValue.bind(this);

        this.searchTypes = [
            {
                isDefault: true,
                value: "_*_"
            },
            {
                isDefault: false,
                value: "*_"
            },
            {
                isDefault: false,
                value: "*"
            }
        ];

        this.state = {
            sortAsc: true,
            searchType: this.getDefaultSearchTypeValue(),
            searchString: "",
            isSearching: false,
            stateSaved: false
        }
    }

    componentDidMount(){
        const savedState = Utils.getSavedState(this.getDefaultSearchTypeValue());
        const stateSaved = savedState.stateSaved;
        const searchType = savedState.searchType;
        const sortAsc = savedState.sortAsc;

        const tables = this.props.tables;
        const contexts = Utils.getInitialContexts(tables);
        this.props.setContexts(contexts);

        const sortAscResult = sortAsc !== null ? sortAsc : true;
        this.setState({
            searchType: stateSaved === true ? searchType : this.state.searchType,
            sortAsc: stateSaved === true ? sortAscResult : this.state.sortAsc,
            stateSaved: stateSaved !== null ? stateSaved : false
        });
    }

    getDefaultSearchTypeValue(){
        return this.searchTypes.find(type => type.isDefault).value;
    }

    onContextClick(row, checked){
        if(checked){
            const headers = row.element.getElementsByTagName("th");

            const dimensions = Utils.getDimensions(headers, row);

            const contexts = Utils.getNewContexts(this.props.contexts, row);

            this.props.setContexts(contexts);
            this.props.addDimensions(dimensions);
            
            this.search(this.state.searchString);
        }
        else{
            const dimensions = Utils.getCheckedDimensions(this.props.dimensions, row);
            const cells = Utils.getContextsCells(this.props.dimensions, this.props.cells, row);

            const contexts = Utils.getNewContexts(this.props.contexts, row);

            this.props.setContexts(contexts);
            this.props.setDimensions(dimensions);
            this.props.setCells(cells);

            this.search(this.state.searchString);
        }
    }

    onDimensionClick(row, checked){
        if(checked){
            const table = Utils.getDimensionTable(this.props.contexts, row);
            const rows = Array.from(table.rows);

            const cells = Utils.getDimensionsCells(rows, row, checked);

            const dimensions = Utils.getNewDimensions(this.props.dimensions, row);

            const sortedCells = Utils.getSortedCells(this.state.sortAsc, this.props.cells, cells);

            this.props.setDimensions(dimensions);
            this.props.setCells(sortedCells);

            this.search(this.state.searchString);
        }
        else{
            const cells = Utils.getCheckedCells(this.props.cells, row);

            const dimensions = Utils.getNewDimensions(this.props.dimensions, row);

            const sortedCells = Utils.getSortedCells(this.state.sortAsc, cells);

            this.props.setDimensions(dimensions);
            this.props.setCells(sortedCells);

            this.search(this.state.searchString);
        }
    }

    onRowClick(){

    }

    onSearchChange(value){
        this.setState(
            {
                isSearching: value === "" ? false : true,
                searchString: value
            },
            () => this.search(this.state.searchString)
        );
    }

    search(value){
        let filteredCells = this.props.cells;
        switch(this.state.searchType){
            case "_*_":
                filteredCells = this.props.cells.filter(item => item.element.innerText.includes(value));
                this.props.setFilteredCells(filteredCells);
                break;
            case "*_":
                filteredCells = this.props.cells.filter(item => item.element.innerText.startsWith(value));
                this.props.setFilteredCells(filteredCells);
                break;
            case "*":
                filteredCells = this.props.cells.filter(item => item.element.innerText === value);
                this.props.setFilteredCells(filteredCells);
                break;
            default:
                this.props.setFilteredCells(filteredCells);
        }
    }

    onSortClick(){
        this.props.setCells(this.props.cells.reverse());
        this.props.setFilteredCells(this.props.filteredCells.reverse());

        this.setState(
            {
                sortAsc: !this.state.sortAsc,
                stateSaved: false
            }
        );
    }

    onSearchTypeClick(type){
        this.setState(
            {
                searchType: type,
                stateSaved: false
            },
            () => this.search(this.state.searchString)
        );
    }

    onSaveClick(){
        this.setState(
            {
                stateSaved: !this.state.stateSaved
            },
            () => {
                localStorage.setItem("stateSaved", this.state.stateSaved);
                localStorage.setItem("sortAsc", this.state.sortAsc);
                localStorage.setItem("searchType", this.state.searchType);
            }
        );
    }

    onRestoreClick(){
        this.setState(
            {
                stateSaved: false,
                searchType: this.getDefaultSearchTypeValue(),
                sortAsc: true
            },
            () => localStorage.setItem("stateSaved", false)
        );
    }   

    render(){
        return(
            <div className="body">
                <Dropdown 
                    onDropdownClick={this.props.onDropdownClick}
                    title="CONTEXTS"
                    rows={this.props.contexts}
                    onRowClick={this.onContextClick}
                    showingComponent={this.props.showingComponent}
                    canUpdate={this.props.canUpdate}
                />
                <Dropdown 
                    onDropdownClick={this.props.onDropdownClick}
                    title="DIMENSIONS"
                    rows={this.props.dimensions}
                    onRowClick={this.onDimensionClick}
                    showingComponent={this.props.showingComponent}
                    canUpdate={this.props.canUpdate}
                />
                <Search 
                    onSearchChange={this.onSearchChange}
                    onSortClick={this.onSortClick}
                    sortAsc={this.state.sortAsc}
                    searchType={this.state.searchType}
                    onSearchTypeClick={this.onSearchTypeClick}
                    searchTypes={this.searchTypes}
                />
                <Rows 
                    rows={this.state.isSearching ? this.props.filteredCells : this.props.cells}
                    onRowClick={this.onRowClick}
                />
                <StateStorage 
                    onSaveClick={this.onSaveClick} 
                    onRestoreClick={this.onRestoreClick} 
                    stateSaved={this.state.stateSaved}
                />
            </div>
        );
    }
}

export default Body;