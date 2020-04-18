import React, {Component} from 'react';
import './App.css';
import './scss/main.scss';
import Header from "./components/Header";
import MainField from "./components/mainField/MainField";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      askType: 'name',
      searchedPhrase: ''
    }
  };

  whatToSearch = (askType, phrase) => {
    this.setState({
      askType: askType,
      searchedPhrase: phrase
    });
  };

  render() {
    return (
        <>
          <Header whatToSearch={this.whatToSearch}/>
          <MainField askType={this.state.askType} searchedPhrase={this.state.searchedPhrase}/>
          <Footer/>
        </>
    );
  }
}

export default App;
