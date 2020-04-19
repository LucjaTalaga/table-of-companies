import React, {Component} from "react";

/**
 * A header for application, where you can filter your data
 */
class Header extends Component{

    state = {
        selectedOption: 'name',
        searchedPhrase: ''
    };
    /**
     * changes the chosen value in select, by which the data will be filtered
     * @method
     * @param {string} e event
     */
    changeHandler = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    };

    /**
     * changes the typed phrase in select, by which the data will be filtered
     * @method
     * @param {string} e event
     */
    inputHandler = (e) => {
        this.setState({
            searchedPhrase: e.target.value
        })
    };

    /**
     * method that is launched when handler is submitted, passes values to function in App component
     * @method
     * @param {string} e event
     */
    headerSubmitHandler = (e) => {
        e.preventDefault();
        this.props.whatToSearch(this.state.selectedOption, e.target.name.value);
    };

    /**
     * function that sets searched phrase to an empty string
     * @method
     * @param {event} e event
     */
    clearButtonHandler = (e) => {
        this.setState({
            searchedPhrase: ''
        })
    };

    render(){
        return(
            <header>
                <h1>Companies table</h1>
                <form className='flex-box' onSubmit={this.headerSubmitHandler}>
                    <label> <span> Find the company by: </span>
                        <select name="ko" value={this.state.selectedOption} onChange={this.changeHandler}>
                            <option value='name'>Name</option>
                            <option value='id'>id</option>
                            <option value='city'>City</option>
                            <option value='total_income'>Total income</option>
                            <option value='average_income'>Average income</option>
                            <option value='last_month_income'>Last month income</option>
                        </select>
                        <input type="text" name="name" value={this.state.searchedPhrase} onChange={this.inputHandler} />
                    </label>
                    <input type="submit" value="Search"/>
                    <button onClick={this.clearButtonHandler}>Clear</button>
                </form>
            </header>
        )
    }
}

export default Header;