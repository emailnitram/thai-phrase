import React from 'react';
import 'fetch';

var ThaiPhrase = React.createClass({
  getInitialState () {
    return {
      words: [],
      word: '',
      meaning: '',
      transliteration: '',
      classes: ''
    }
  },

  componentDidMount () {
    React.findDOMNode(this.refs.wordInput).focus();
    fetch(this.props.source).then(r => r.json())
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
React.render(
  <ThaiPhrase source="words.json">Phrase!</ThaiPhrase>,
  document.getElementById('example')
);

