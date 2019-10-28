import React from 'react';
import './style.css';
import Dropdown from './Dropdown';
import Search from './Search';
import Rows from './Rows';

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

        this.state = {
            sortAsc: true,
            searchType: "_*_",
            searchString: "",
            contexts: [],
            dimensions: [],
            cells: [],
            isSearching: false,
            filteredCells: []
        }
    }

    componentDidMount(){
        const tables = document.getElementsByTagName("table");
        const contexts = [];

        for(let i = 0; i < tables.length; i++){
            const element = tables[i];
            element.id = tables[i].id || `table${i}`;

            contexts.push({checked: false, element});
        }

        this.setState({
            contexts
        });
    }

    onContextClick(row, checked){
        if(checked){
            const headers = row.element.getElementsByTagName("th");
            const dimensions = [];
    
            for(let i = 0; i < headers.length; i++){
                const header = headers[i];
                header.id = `${row.element.id}/${header.innerText}`;
    
                dimensions.push({
                    checked: false,
                    parent: row,
                    element: header,
                    index: i
                });
            }

            const contexts = this.state.contexts.map((item) => {
                if(item.element.id === row.element.id){
                    return {
                        checked: !item.checked, 
                        element: item.element
                    };
                }

                return item;
            });
    
            this.setState({
                dimensions: [...this.state.dimensions, ...dimensions],
                contexts
            });
        }
        else{
            const headers = this.state.dimensions;
            const dimensions = [];
            
            const rows = this.state.cells;
            const cells = [];

            headers.map(header => {
                if(header.parent.element.id !== row.element.id){
                    dimensions.push(header);
                }
                else{
                    rows.map(item => {
                        if(item.parent.parent.element.id !== header.parent.element.id){
                            if(!cells.includes(item)){
                                cells.push(item);
                            }
                        }
                    });
                }
            });

            const contexts = this.state.contexts.map((item) => {
                if(item.element.id === row.element.id){
                    return {
                        checked: !item.checked, 
                        element: item.element
                    };
                }

                return item;
            });

            this.setState({
                dimensions,
                cells,
                contexts
            });
        }
    }

    onDimensionClick(row, checked){
        if(checked){
            const table = this.state.contexts.find(
                (context) => row.parent.element.id == context.element.id
            )
            .element;
            const cells = [];
            const rows = Array.from(table.rows);

            rows.map((item, index) => {
                if(index > 0){
                    const cell = item.cells[row.index];
                    cell.id = cell.innerText;

                    cells.push({
                        checked,
                        parent: row,
                        element: cell
                    });
                }
            });

            const dimensions = this.state.dimensions.map((item) => {
                if(item.element.id === row.element.id){
                    return {
                        checked: !item.checked, 
                        element: item.element,
                        parent: item.parent,
                        index: item.index
                    };
                }

                return item;
            });

            const sortedCells = [...this.state.cells, ...cells]
                .sort(
                    (cell1, cell2) => 
                        cell1.element.innerText > cell2.element.innerText 
                        ? this.state.sortAsc ? 1 : -1 
                        : this.state.sortAsc ? -1 : 1
                );

            this.setState({
                cells: sortedCells,
                dimensions
            },
            () => this.search(this.state.searchString));
        }
        else{
            const rows = this.state.cells;
            const cells = [];

            rows.map(item => {
                if(item.parent.element.id !== row.element.id){
                    cells.push(item);
                }
            });

            const dimensions = this.state.dimensions.map((item) => {
                if(item.element.id === row.element.id){
                    return {
                        checked: !item.checked, 
                        element: item.element,
                        parent: item.parent,
                        index: item.index
                    };
                }

                return item;
            });

            const sortedCells = cells
                .sort(
                    (cell1, cell2) => 
                        cell1.element.innerText > cell2.element.innerText 
                        ? this.state.sortAsc ? 1 : -1 
                        : this.state.sortAsc ? -1 : 1
                );

            this.setState({
                cells: sortedCells,
                dimensions
            },
            () => this.search(this.state.searchString));
        }
    }

    onRowClick(){

    }

    onSearchChange(value){
        this.setState({
            isSearching: value === "" ? false : true,
            searchString: value
        },
        () => this.search(this.state.searchString));
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
        const sort = !this.state.sortAsc;

        if(this.state.isSearching){
            this.setState({
                filteredCells: this.state.filteredCells.reverse(),
                sortAsc: sort
            });
        }
        else{
            this.setState({
                cells: this.state.cells.reverse(),
                sortAsc: sort
            });
        }
    }

    onSearchTypeClick(type){
        this.setState({
            searchType: type
        },
        () => this.search(this.state.searchString));
    }

    render(){
        return(
            <div className="body">
                <Dropdown 
                    title="CONTEXTS"
                    rows={this.state.contexts}
                    onRowClick={this.onContextClick}
                />
                <Dropdown 
                    title="DIMENSIONS"
                    rows={this.state.dimensions}
                    onRowClick={this.onDimensionClick}
                />
                <Search 
                    onSearchChange={this.onSearchChange}
                    onSortClick={this.onSortClick}
                    sortAsc={this.state.sortAsc}
                    searchType={this.state.searchType}
                    onSearchTypeClick={this.onSearchTypeClick}
                />
                <Rows 
                    rows={this.state.isSearching ? this.state.filteredCells : this.state.cells}
                    onRowClick={this.onRowClick}
                />
            </div>
        );
    }
}

export default Body;