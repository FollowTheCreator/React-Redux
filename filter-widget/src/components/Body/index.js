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
            contexts: [],
            dimensions: [],
            cells: [],
            isSearching: false,
            filteredCells: [],
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

        const sortAscResult = sortAsc !== null ? sortAsc : true;
        this.setState({
            contexts,
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

            const contexts = Utils.getNewContexts(this.state.contexts, row);
    
            this.setState(
                {
                    dimensions: [...this.state.dimensions, ...dimensions],
                    contexts
                },
                () => this.search(this.state.searchString)
            );
        }
        else{
            const dimensions = Utils.getCheckedDimensions(this.state.dimensions, row);
            const cells = Utils.getContextsCells(this.state.dimensions, this.state.cells, row);

            const contexts = Utils.getNewContexts(this.state.contexts, row);

            this.setState(
                {
                    dimensions,
                    cells,
                    contexts
                },
                () => this.search(this.state.searchString)
            );
        }
    }

    onDimensionClick(row, checked){
        if(checked){
            const table = Utils.getDimensionTable(this.state.contexts, row);
            const rows = Array.from(table.rows);

            const cells = Utils.getDimensionsCells(rows, row, checked);

            const dimensions = Utils.getNewDimensions(this.state.dimensions, row);

            const sortedCells = Utils.getSortedCells(this.state.sortAsc, this.state.cells, cells);

            this.setState(
                {
                    cells: sortedCells,
                    dimensions
                },
                () => this.search(this.state.searchString)
            );
        }
        else{
            const cells = Utils.getCheckedCells(this.state.cells, row);

            const dimensions = Utils.getNewDimensions(this.state.dimensions, row);

            const sortedCells = Utils.getSortedCells(this.state.sortAsc, cells);

            this.setState(
                {
                    cells: sortedCells,
                    dimensions
                },
                () => this.search(this.state.searchString)
            );
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
        switch(this.state.searchType){
            case "_*_":
                this.setState({
                    filteredCells: this.state.cells.filter(item => item.element.innerText.includes(value))
                });
                break;
            case "*_":
                this.setState({
                    filteredCells: this.state.cells.filter(item => item.element.innerText.startsWith(value))
                });
                break;
            case "*":
                this.setState({
                    filteredCells: this.state.cells.filter(item => item.element.innerText === value)
                });
                break;
            default:
                this.setState({
                    filteredCells: this.state.cells
                });
        }
    }

    onSortClick(){
        this.setState(
            {
                cells: this.state.cells.reverse(),
                filteredCells: this.state.filteredCells.reverse(),
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
                    rows={this.state.contexts}
                    onRowClick={this.onContextClick}
                    showingComponent={this.props.showingComponent}
                    canUpdate={this.props.canUpdate}
                />
                <Dropdown 
                    onDropdownClick={this.props.onDropdownClick}
                    title="DIMENSIONS"
                    rows={this.state.dimensions}
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
                    rows={this.state.isSearching ? this.state.filteredCells : this.state.cells}
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