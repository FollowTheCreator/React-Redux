import React from 'react';
import './style.css';
import Dropdown from '../FilterWidgetDropdown';
import Search from '../FilterWidgetSearch';
import Rows from '../FilterWidgetRows';
import StateStorage from '../FilterWidgetStateStorage';
import CellsService from '../../Services/CellsService';
import DimensionsService from '../../Services/DimensionsService';
import ContextsService from '../../Services/ContextsService';
import StateService from '../../Services/StateService';
import PropTypes from 'prop-types';

class FilterWidgetBody extends React.PureComponent {
    constructor(props) {
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

    componentDidMount() {
        const savedState = StateService.getSavedState(this.getDefaultSearchTypeValue());
        const stateSaved = savedState.stateSaved;
        const searchType = savedState.searchType;
        const sortAsc = savedState.sortAsc;

        const tables = this.props.tables;
        const contexts = ContextsService.getInitialContexts(tables);

        const sortAscResult = sortAsc !== null ? sortAsc : true;
        this.setState({
            contexts,
            searchType: stateSaved === true ? searchType : this.state.searchType,
            sortAsc: stateSaved === true ? sortAscResult : this.state.sortAsc,
            stateSaved: stateSaved !== null ? stateSaved : false
        });
    }

    getDefaultSearchTypeValue() {
        return this.searchTypes.find(type => type.isDefault).value;
    }

    onContextClick(row, checked) {
        if (checked) {
            const headers = row.element.getElementsByTagName("th");

            const dimensions = DimensionsService.getDimensions(headers, row);

            const contexts = ContextsService.getNewContexts(this.state.contexts, row);

            this.setState(
                {
                    dimensions: [...this.state.dimensions, ...dimensions],
                    contexts
                },
                () => this.search(this.state.searchString)
            );
        }
        else {
            const dimensions = DimensionsService.getCheckedDimensions(this.state.dimensions, row);
            const cells = CellsService.getContextsCells(this.state.dimensions, this.state.cells, row);

            const contexts = ContextsService.getNewContexts(this.state.contexts, row);

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

    onDimensionClick(row, checked) {
        if (checked) {
            const table = DimensionsService.getDimensionTable(this.state.contexts, row);
            const rows = Array.from(table.rows);

            const cells = CellsService.getDimensionsCells(rows, row, checked);

            const dimensions = DimensionsService.getNewDimensions(this.state.dimensions, row);

            const sortedCells = CellsService.getSortedCells(this.state.sortAsc, this.state.cells, cells);

            this.setState(
                {
                    cells: sortedCells,
                    dimensions
                },
                () => this.search(this.state.searchString)
            );
        }
        else {
            const cells = CellsService.getCheckedCells(this.state.cells, row);

            const dimensions = DimensionsService.getNewDimensions(this.state.dimensions, row);

            const sortedCells = CellsService.getSortedCells(this.state.sortAsc, cells);

            this.setState(
                {
                    cells: sortedCells,
                    dimensions
                },
                () => this.search(this.state.searchString)
            );
        }
    }

    onRowClick() {

    }

    onSearchChange(value) {
        this.setState(
            {
                isSearching: value === "" ? false : true,
                searchString: value
            },
            () => this.search(this.state.searchString)
        );
    }

    search(value) {
        switch (this.state.searchType) {
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

    onSortClick() {
        this.setState(
            {
                cells: this.state.cells.reverse(),
                filteredCells: this.state.filteredCells.reverse(),
                sortAsc: !this.state.sortAsc,
                stateSaved: false
            }
        );
    }

    onSearchTypeClick(type) {
        this.setState(
            {
                searchType: type,
                stateSaved: false
            },
            () => this.search(this.state.searchString)
        );
    }

    onSaveClick() {
        this.setState(
            {
                stateSaved: !this.state.stateSaved
            },
            () => {
                StateService.setSavedState({
                    stateSaved: this.state.stateSaved,
                    sortAsc: this.state.sortAsc,
                    searchType: this.state.searchType
                });
            }
        );
    }

    onRestoreClick() {
        this.setState(
            {
                stateSaved: false,
                searchType: this.getDefaultSearchTypeValue(),
                sortAsc: true
            },
            () => localStorage.setItem("stateSaved", false)
        );
    }

    render() {
        return (
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

FilterWidgetBody.propTypes = {
    tables: PropTypes.object.isRequired,
    onDropdownClick: PropTypes.func.isRequired,
    showingComponent: PropTypes.object,
    canUpdate: PropTypes.bool.isRequired
}

FilterWidgetBody.defaultProps = {
    tables: {},
    onDropdownClick: () => { },
    showingComponent: {},
    canUpdate: true
}

export default FilterWidgetBody;