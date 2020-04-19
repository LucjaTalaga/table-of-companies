import React, {Component} from "react";

const COMPANIES_PER_PAGE = 50;

/**
 * A component that creates Table
 */
class Table extends Component{

    state = {
        page: 1
    };

    /**
     * method that changes the number of page, that is stored in state of component
     * @method
     * @param {string} e event
     * @param {num} num number of page
     */
    pagesButtonHandler = (e, num) => {
        this.setState({
            page: num
        });
    };
    /**
     * method that counts number of pages and creates an array of number that equals number of pages
     * @method
     * @param {array} companies an array of data about companies
     * @return {array} an array with page numbers
     */
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

    /**
     * method that gets complete array of companies and returns only those that will be shown on one page
     * @method
     * @param {array} data an array of data about companies
     * @return {array} data about companies that will be shown on one page
     */
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

    /**
     * method that creates a JSX element - table rows with companies data
     * @method
     * @param {array} data an array of data about companies
     * @return {JSX} table row with data
     */
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
                        {this.getPages(companies).map(el => <button key={el} onClick={e => this.pagesButtonHandler(e, el)} className={ this.state.page === el ? 'activeButton': '' }>{el}</button>)}
                    </div>
                </section>
            )
        }
    }
}

export default Table;