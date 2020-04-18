import React, {Component} from "react";
import getDataFromAPI from '../../api/GetDataFromAPI';
import getCompaniesIncome from './GetCompaniesIncome';
import Table from "./Table";

class MainField extends Component{

    state = {
        companiesData: null,
        sortedBy: null,
        filteredData: null
    };

    loadAllCompaniesData = () => {
        getDataFromAPI('companies').then(companies => {
            companies.sort((a, b) => {
                return a.id - b.id;
            });
            getCompaniesIncome(companies).then(companies => {
                this.setState({
                    companiesData: companies,
                    sortedBy: 'id',
                    filteredData: companies
                });
            });
        })
    };

    dataSort = (e, dataType) => {
        const companiesToSort = [...this.state.filteredData];
        let sorted = this.state.sortedBy;
        if(dataType==='name' || dataType==='city'){
            if(sorted === dataType){
                companiesToSort.sort((a, b) => {
                    return b[`${dataType}`].localeCompare(a[`${dataType}`]);
                });
                sorted = "-"+dataType;
            }
            else{
                companiesToSort.sort((a, b) => {
                    return a[`${dataType}`].localeCompare(b[`${dataType}`]);
                });
                sorted = dataType;
            }
        }
        else {
            if(sorted === dataType){
                companiesToSort.sort((a, b) => {
                    return b[`${dataType}`] - a[`${dataType}`];
                });
                sorted = "-"+dataType;
            }
            else{
                companiesToSort.sort((a, b) => {
                    return a[`${dataType}`] - b[`${dataType}`];
                });
                sorted = dataType;
            }
        }
        this.setState({
            filteredData: companiesToSort,
            sortedBy: sorted
        });
    };

    filterData = (phrase, dataType) => {
        let newFilteredData = [...this.state.companiesData];
        if(phrase) {
            newFilteredData = newFilteredData.filter((element) => {
                return String(element[`${dataType}`]).includes(phrase);
            });
        }
        this.setState({
           filteredData: newFilteredData
        });
    };

    componentDidMount() {
        this.loadAllCompaniesData();
    }

    componentDidUpdate(prevProps) {
        const {searchedPhrase, askType} = this.props;
        if(searchedPhrase !== prevProps.searchedPhrase || askType !== prevProps.askType){
            this.filterData(searchedPhrase, askType);
        }
    }

    render() {
        return <Table companies={this.state.filteredData} dataSort={this.dataSort}/>
    }
}

export default MainField;
