import React, {Component} from "react";
import getDataFromAPI from '../api/GetDataFromAPI';

class MainField extends Component{

    state = {
        companiesData: []
    };

    loadAllCompaniesData = () => {
        getDataFromAPI('companies').then(companies => {
            console.log('Pokaż firmy:', companies);
            companies.sort( (a, b) => {
                return a.id - b.id;
            });
            this.getCompaniesIncome(companies);
            this.setState({
                companiesData: companies
            });
        });
    };

    getCompaniesIncome = (companies) => {
        companies.forEach(company => {
            getDataFromAPI(`incomes/${company.id}`).then(income => {
            company.total_income = this.countTotalIncome(income);
            company.average_income = this.countTotalIncome(income)/income.incomes.length;
            company.last_month_income = this.countLastMonthIncome(income);
            });
        });
    };

    countTotalIncome = (income) => {
        return 100;
    };

    countLastMonthIncome = (income) => {
        return 10;
    };

    componentDidMount() {
        this.loadAllCompaniesData();
    }

    render() {
        return(
            <section>
                <p>Pytanie o: {this.props.askType}, szukana fraza: {this.props.searchedPhrase}</p>
            </section>
        )
    }
}

export default MainField;
