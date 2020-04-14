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
        console.log("Header handler odpalony");
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
                            <option value='name'>name</option>
                            <option value='city'>city</option>
                            <option value='total income'>total income</option>
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