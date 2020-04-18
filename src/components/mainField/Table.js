import React, {Component} from "react";

const COMPANIES_PER_PAGE = 50;

class Table extends Component{

    state = {
        page: 1
    };

    pagesButtonHandler = (e, num) => {
        this.setState({
            page: num
        });
    };

    getPages = (companies) => {
        let numberOfPages = (companies.length%COMPANIES_PER_PAGE===0) ? companies.length/COMPANIES_PER_PAGE :
            (Math.floor(companies.length/COMPANIES_PER_PAGE))+1;
        let pages = [];
        if(numberOfPages>1) {
            for (let i = 0; i < numberOfPages; i++) {
                pages[i] = i + 1;
            }
        }
        return pages;
    };

    getActualPageContent = (data) => {
        const {page} = this.state;
        let actualPageData = [];
        for(let i=0; i<COMPANIES_PER_PAGE; i++){
            let actualCompany = data[(COMPANIES_PER_PAGE*(page - 1))+i];
            if(actualCompany){
                actualPageData.push(actualCompany);
            }
        }
        return actualPageData;
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

    componentDidUpdate(prevProps) {
        const {companies} = this.props;
        if(companies !== prevProps.companies) {
            this.setState({
                page: 1
            })
        }
    }

    render() {
        const {companies, dataSort} = this.props;
        if (!this.props.companies) {
            return (
                <h1 id='data-loading'>Data loading ...</h1>
            )
        }
        else {
            return (
                <section className="mainTable flex-box">
                    <table id="companies">
                        <thead>
                        <tr>
                            <th onClick={e => dataSort(e, 'id')}>id</th>
                            <th onClick={e => dataSort(e, 'name')}>Name</th>
                            <th onClick={e => dataSort(e, 'city')}>City</th>
                            <th onClick={e => dataSort(e, 'total_income')}>Total income</th>
                            <th onClick={e => dataSort(e, 'average_income')}>Average income</th>
                            <th onClick={e => dataSort(e, 'last_month_income')}>Last month income</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.createTableContent(this.getActualPageContent(companies))}
                        </tbody>
                    </table>
                    <div className='pageNumbers'>
                        {this.getPages(companies).map(el => <button onClick={e => this.pagesButtonHandler(e, el)} className={ this.state.page === el ? 'activeButton': '' }>{el}</button>)}
                    </div>
                </section>
            )
        }
    }
}

export default Table;