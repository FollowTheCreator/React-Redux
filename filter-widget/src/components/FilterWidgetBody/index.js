import React, { useState, useEffect } from 'react';
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

const DIMENSIONS = "DIMENSIONS";
const CONTEXTS = "CONTEXTS";

const FilterWidgetBody = (props) => {
    const searchTypes = [
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

    const getDefaultSearchTypeValue = () => {
        return searchTypes.find(type => type.isDefault).value;
    }

    const [searchType, setSearchType] = useState(getDefaultSearchTypeValue());
    const [searchString, setSearchString] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [stateSaved, setStateSaved] = useState(false);
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(
        () => {
            const savedState1 = StateService.getSavedState(getDefaultSearchTypeValue());
            const stateSaved1 = savedState1.stateSaved;
            const searchType1 = savedState1.searchType;
            const sortAsc1 = savedState1.sortAsc;

            const contexts = ContextsService.getInitialContexts(props.tables);
            props.setContexts(contexts);

            const sortAscResult = sortAsc1 !== null ? sortAsc1 : true;
            setSearchType(stateSaved1 === true ? searchType1 : searchType);
            setSortAsc(stateSaved1 === true ? sortAscResult : sortAsc);
            setStateSaved(stateSaved1 !== null ? stateSaved1 : false);
        },
        []
    );

    const onContextClick = (row, checked) => {
        if (checked) {
            const headers = row.element.getElementsByTagName("th");

            const dimensions = DimensionsService.getDimensions(headers, row);

            props.addDimensions(dimensions);
        }
        else {
            const dimensions = DimensionsService.getCheckedDimensions(props.dimensions, row.element.id);
            const cells = CellsService.getContextsCells(props.dimensions, props.cells, row.element.id);

            props.setDimensions(dimensions);
            props.setCells(cells);
        }

        const contexts = ContextsService.getNewContexts(props.contexts, row.element.id);
        props.setContexts(contexts);

        search(searchString);
    }

    const onDimensionClick = (row, checked) => {
        let sortedCells = [];
        if (checked) {
            const table = DimensionsService.getDimensionTable(props.contexts, row.parent.element.id);
            const rows = Array.from(table.rows);

            const cells = CellsService.getDimensionsCells(rows, row, checked);
            sortedCells = CellsService.getSortedCells(sortAsc, props.cells, cells);
        }
        else {
            const cells = CellsService.getCheckedCells(props.cells, row.element.id);
            sortedCells = CellsService.getSortedCells(sortAsc, cells);
        }

        const dimensions = DimensionsService.getNewDimensions(props.dimensions, row.element.id);

        props.setDimensions(dimensions);
        props.setCells(sortedCells);

        search(searchString);
    }

    const onRowClick = () => {

    }

    const onSearchChange = (value) => {
        setIsSearching(value === "" ? false : true);
        setSearchString(value);
        search(value);
    }

    const search = (value) => {
        let filteredCells = [];
        switch (searchType) {
            case "_*_":
                filteredCells = props.cells.filter(item => item.element.innerText.includes(value));
                break;
            case "*_":
                filteredCells = props.cells.filter(item => item.element.innerText.startsWith(value));
                break;
            case "*":
                filteredCells = props.cells.filter(item => item.element.innerText === value);
                break;
            default:
                filteredCells = props.cells;
        }

        props.setFilteredCells(filteredCells);
    }

    const onSortClick = () => {
        props.setCells(props.cells.reverse());
        props.setFilteredCells(props.filteredCells.reverse());

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        const sortAscRes = !sortAsc;
        setSortAsc(sortAscRes);
        setStateSaved(false);
    }

    const onSearchTypeClick = (type) => {
        setSearchType(type);
        setStateSaved(false);
        search(searchString);
    }

    const onSaveClick = () => {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        const stateSavedRes = !stateSaved;
        setStateSaved(stateSavedRes);
        StateService.setSavedState({
            stateSaved: stateSavedRes,
            sortAsc: sortAsc,
            searchType: searchType
        });
    }

    const onRestoreClick = () => {
        setStateSaved(false);
        setSearchType(getDefaultSearchTypeValue());
        setSortAsc(true);
        StateService.setStateSaved(false);
    }

    return (
        <div className="body">
            <Dropdown
                onDropdownClick={props.onDropdownClick}
                title={CONTEXTS}
                rows={props.contexts}
                onRowClick={onContextClick}
                showingComponent={props.showingComponent}
                canUpdate={props.canUpdate}
                id={CONTEXTS}
            />
            <Dropdown
                onDropdownClick={props.onDropdownClick}
                title={DIMENSIONS}
                rows={props.dimensions}
                onRowClick={onDimensionClick}
                showingComponent={props.showingComponent}
                canUpdate={props.canUpdate}
                id={DIMENSIONS}
            />
            <Search
                onSearchChange={onSearchChange}
                onSortClick={onSortClick}
                sortAsc={sortAsc}
                searchType={searchType}
                onSearchTypeClick={onSearchTypeClick}
                searchTypes={searchTypes}
            />
            <Rows
                rows={isSearching ? props.filteredCells : props.cells}
                onRowClick={onRowClick}
            />
            <StateStorage
                onSaveClick={onSaveClick}
                onRestoreClick={onRestoreClick}
                stateSaved={stateSaved}
            />
        </div>
    );
}

FilterWidgetBody.propTypes = {
    tables: PropTypes.array.isRequired,
    contexts: PropTypes.array.isRequired,
    dimensions: PropTypes.array.isRequired,
    cells: PropTypes.array.isRequired,
    filteredCells: PropTypes.array.isRequired,
    addDimensions: PropTypes.func.isRequired,
    setDimensions: PropTypes.func.isRequired,
    setContexts: PropTypes.func.isRequired,
    setCells: PropTypes.func.isRequired,
    setFilteredCells: PropTypes.func.isRequired,
    onDropdownClick: PropTypes.func.isRequired,
    showingComponent: PropTypes.string,
    canUpdate: PropTypes.bool.isRequired
}

FilterWidgetBody.defaultProps = {
    tables: [],
    contexts: [],
    dimensions: [],
    cells: [],
    filteredCells: [],
    addDimensions: () => { },
    setDimensions: () => { },
    setContexts: () => { },
    setCells: () => { },
    setFilteredCells: () => { },
    onDropdownClick: () => { },
    showingComponent: "",
    canUpdate: true
}

export default FilterWidgetBody;