import React, {Component} from "react";

class MainField extends Component{

    render() {
        return(
            <section>
                <p>Pytanie o: {this.props.askType}, szukana fraza: {this.props.searchedPhrase}</p>
            </section>
        )
    }
}

export default MainField;
