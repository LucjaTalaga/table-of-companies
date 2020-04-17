import React, {Component} from "react";

class Header extends Component{

    state = {
        selectedOption: 'name',
        searchedPhrase: ''
    };
    changeHandler = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    };

    inputHandler = (e) => {
        this.setState({
            searchedPhrase: e.target.value
        })
    };

    headerSubmitHandler = (e) => {
        e.preventDefault();
        this.props.whatToSearch(this.state.selectedOption, e.target.name.value);
    };

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
                    <label> Find the company by:
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