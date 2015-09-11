import Router from 'react-router';
import React from 'react';
import 'fetch';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


var App = React.createClass({
  render() {
    return (
      <RouteHandler/>
    )
  }
});

var AddPhrase = React.createClass({
  handleSubmit(event){
    var phrase = React.findDOMNode(this.refs.phrase).value.trim();
    var meaning = React.findDOMNode(this.refs.meaning).value.trim();
    var transliteration = React.findDOMNode(this.refs.transliteration).value.trim();
    console.log(phrase + 'a');
    console.log('meaning',meaning);
    console.log('transliteration',transliteration);
  },
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="phrase">Phrase:</label>
          <input id="phrase" type="text" ref="phrase"/>
          <label htmlFor="meaning">Meaning:</label>
          <input id="meaning" type="text" ref="meaning"/>
          <label htmlFor="transliteration">Transliteration:</label>
          <input id="transliteration" type="text" ref="transliteration"/>
          <button type="submit">Add Phrase</button>
        </form>
      </div>
      )
  }
});


var ThaiPhrase = React.createClass({
  getInitialState () {
    return {
      source: 'http://localhost:3000/words.json',
      words: [],
      word: '',
      meaning: '',
      transliteration: '',
      classes: ''
    }
  },

  componentDidMount () {
    React.findDOMNode(this.refs.wordInput).focus();
    fetch(this.state.source).then(r => r.json())
    .then((results) => {
      var nextWord = this.getRandomWord(results);
      if(this.isMounted()) {
        this.setState({
          matchedWord: false,
          words: results,
          word: nextWord.word,
          meaning: nextWord.meaning,
          transliteration: nextWord.transliteration
        })
      }
    })
  },

  getRandomWord (o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o[0];
  },

  checkWord (event) {
    if(this.state.word === event.target.value){
      this.matchedWord = true;
      this.setState({classes: 'green'});
    }
  },

  getNextWord (event) {
    event.preventDefault();
    if(this.matchedWord) {
      var nextWord = this.getRandomWord(this.state.words);
      this.setState({
        word: nextWord.word,
        meaning: nextWord.meaning,
        transliteration: nextWord.transliteration
      });
      this.setState({classes: ''});
      this.matchedWord = false;
      React.findDOMNode(this.refs.wordInput).value = '';
      React.findDOMNode(this.refs.wordInput).focus();
    }
  },

  render () {
    return (
      <div>
        <form onSubmit={this.getNextWord}>
          <input type="text" onChange={this.checkWord} ref="wordInput" />
          <h1>{this.state.word}</h1>
          <h4>{this.state.meaning}</h4>
          <h4>{this.state.transliteration}</h4>
          <button type="submit">Next</button>
        </form>
      </div>
    )
  }
})

var routes = (
    <Route handler={App}>
      <DefaultRoute handler={ThaiPhrase}/>
      <Route path="phrase" handler={ThaiPhrase}/>
      <Route path="add-phrase" handler={AddPhrase}/>
    </Route>
);

var RouteHandler = Router.RouteHandler;

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
