import React, { Component } from 'react';
import axios from 'axios';

class Dictonary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word_id: "",
      data: {}
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.callApi = this.callApi.bind(this);
  }


  handleSearch(e) {
    this.setState({
      word_id: e.target.value
    });
  }

  handleSubmit(e) {
    this.callApi();
    e.preventDefault();
  }

  callApi() {
    let headers = {
      "app_id": '49891db4',
      "app_key": '4f81d9c7e8417a1dfac5c9904c18afc3'
    }
    let word = this.state.word_id;
    let url = `https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}`;

    axios.get(url,{headers})
    .then(res => {
      this.setState({
        data: {
          definitions: res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0],
          examples: res.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
        }
      });
    })
  }

  render() {
    return (
      <React.Fragment>

        <form>
          <input
            type="search"
            value={this.state.word_id}
            onChange={this.handleSearch}
          />
          <button onClick={this.handleSubmit}>Search</button>
        </form>


        <div>
          <label>Definitions</label>
          <p>{ this.state.data.definitions }</p>
        </div>
        <div>
          <label>Examples</label>
          <p>{ this.state.data.examples }</p>
        </div>
      </React.Fragment>
    );
  }



}

export default Dictonary;