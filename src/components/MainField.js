import React, {Component} from "react";
import getDataFromAPI from '../api/GetDataFromAPI';

class MainField extends Component{

    state = {
        companiesData: null
    };

    loadAllCompaniesData = () => {
        getDataFromAPI('companies').then(companies => {
            //console.log('Pokaż firmy:', companies);
            companies.sort((a, b) => {
                return a.id - b.id;
            });
            this.getCompaniesIncome(companies).then(companies => {
                console.log(companies[0].total_income);
                this.setState({
                    companiesData: companies
                });
                console.log(this.state.companiesData[0].total_income);
            });
        })
    };

    getCompaniesIncome = async (companies) => {
            let companiesUpdate = companies;
            console.log(companiesUpdate);
            let urls = [];
               companies.forEach( company=> {
               urls.push(`incomes/${company.id}`);
            //getDataFromAPI(`incomes/${company.id}`).then(income => {
            //company.total_income = this.countTotalIncome(income.incomes);
            //company.average_income = this.countAverageIncome(income.incomes);
            //company.last_month_income = this.countLastMonthIncome(income.incomes);
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
              console.log(urls);
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

    countLastMonthIncome = (income) => {
        return 10;
    };

    dataSort = (e, dataType) => {
        console.log("Będzie sortowańsko po "+dataType);
    };

    createTableContent = (data) => {
        return data.map( company => {
            const { id, name, city, total_income, average_income, last_month_income } = company;
            console.log(total_income);
            console.log(name);
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

    componentDidMount() {
        this.loadAllCompaniesData();
    }

    render() {
        if (!this.state.companiesData) {
            return (
                <h1 id='data-loading'>Data loading ...</h1>
            )
        }
        else {
            console.log(this.state.companiesData);
            return (
                <section>
                    <p>Pytanie o: {this.props.askType}, szukana fraza: {this.props.searchedPhrase}</p>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={e => this.dataSort(e, 'id')}>id</th>
                                <th onClick={e => this.dataSort(e, 'name')}>name</th>
                                <th onClick={e => this.dataSort(e, 'city')}>city</th>
                                <th onClick={e => this.dataSort(e, 'total_income')}>total income</th>
                                <th onClick={e => this.dataSort(e, 'average_income')}>average income</th>
                                <th onClick={e => this.dataSort(e, 'last_month_income')}>last month income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.createTableContent(this.state.companiesData)}
                        </tbody>
                    </table>
                    <p>Total income: {this.state.companiesData[0].total_income}</p>
                </section>
            )
        }
    }
}

export default MainField;
