import React, {Component} from "react";
import getDataFromAPI from '../api/GetDataFromAPI';

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
            this.getCompaniesIncome(companies).then(companies => {
                this.setState({
                    companiesData: companies,
                    sortedBy: 'id',
                    filteredData: companies
                });
            });
        })
    };

    getCompaniesIncome = async (companies) => {
            let companiesUpdate = companies;
            let urls = [];
               companies.forEach( company=> {
               urls.push(`incomes/${company.id}`);
            });
            let requests = urls.map(url => getDataFromAPI(url));
            await Promise.all(requests)
                .then(incomes => incomes.forEach(
                    (income, index) => {
                        companiesUpdate[index].total_income = this.countTotalIncome(income.incomes);
                        companiesUpdate[index].average_income = this.countAverageIncome(income.incomes);
                        companiesUpdate[index].last_month_income = this.countLastMonthIncome(income.incomes);
                    }
                ));
              return companiesUpdate;
    };

    countTotalIncome = (incomes) => {
        let totalIncome = 0;
        for (let i = 0; i < incomes.length ; i++){
            totalIncome += parseFloat(incomes[i].value);
        }
        return parseFloat(totalIncome.toFixed(2));
    };

    countAverageIncome = (incomes) => {
        return parseFloat((this.countTotalIncome(incomes)/incomes.length).toFixed(2));
    };

    countLastMonthIncome = (incomes) => {
        let lastMonthIncomes = [...incomes];
        let recentData = 0;
        lastMonthIncomes.forEach( income => {
            let yearAndMonth = Number(income.date.substr(0,7).replace("-", ""));
            if(yearAndMonth > recentData){
                recentData = yearAndMonth;
            }
        });
        lastMonthIncomes = lastMonthIncomes.filter( income => {
            return recentData === Number(income.date.substr(0,7).replace("-", ""));
        });
        return this.countTotalIncome(lastMonthIncomes);
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

    createTableContent = (data) => {
        return data.map( company => {
            const { id, name, city, total_income, average_income, last_month_income } = company;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{city}</td>
                    <td>{total_income}</td>
                    <td>{average_income}</td>
                    <td>{last_month_income}</td>
                </tr>
            )
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
        if (!this.state.companiesData) {
            return (
                <h1 id='data-loading'>Data loading ...</h1>
            )
        }
        else {
            return (
                <section className="mainField flex-box">
                    <table id="companies">
                        <thead>
                            <tr>
                                <th onClick={e => this.dataSort(e, 'id')}>id</th>
                                <th onClick={e => this.dataSort(e, 'name')}>Name</th>
                                <th onClick={e => this.dataSort(e, 'city')}>City</th>
                                <th onClick={e => this.dataSort(e, 'total_income')}>Total income</th>
                                <th onClick={e => this.dataSort(e, 'average_income')}>Average income</th>
                                <th onClick={e => this.dataSort(e, 'last_month_income')}>Last month income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.createTableContent(this.state.filteredData)}
                        </tbody>
                    </table>
                </section>
            )
        }
    }
}

export default MainField;
