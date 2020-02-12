import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      title: 'SPRING LIBRARY',
      act: 0,
      index: '',
      books: [],
      isButtonsDisabled: false
    }
  }

  componentDidMount() {
    fetch("http://localhost:8090/api/books")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            books: result
          });
          console.log(result);
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.books;
    let bookTitle = this.refs.bookTitle.value;
    let authors = []
    let author =new Object()
    author.firstName = this.refs.authorName.value;
    author.lastName = this.refs.authorLastName.value;
    authors.push(author)



    if (this.state.act === 0) { //new
      let data = {
        bookTitle,
        authors
      }
  
      datas.push(data); 
    } else {                    //update
      let index = this.state.index;
      datas[index].bookTitle = bookTitle;
      datas[index].authors = authors
    }

    this.setState({
      books: datas,
      act: 0,
      isButtonsDisabled: false
    });
    this.refs.myForm.reset();
    this.refs.bookTitle.focus();
  }

  fRemove = (i) => {
    let datas  = this.state.books;
    datas.splice(i,1);
    this.setState({
      datas:datas
    });

    this.refs.myForm.reset();
    this.refs.bookTitle.focus();
  }

  fEdit = (i) => {
    this.state.isButtonsDisabled = true;
    let book = this.state.books[i];
    this.refs.bookTitle.value = book.bookTitle;
    this.refs.authorName.value = book.authors[0].firstName;
    this.refs.authorLastName.value = book.authors[0].lastName;

    this.setState({
      act: 1,
      index: i 
    })

  }


  render() {
    let books = this.state.books;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="bookTitle" placeholder="Book title" className="formField" />
          <input type="text" ref="authorName" placeholder="Author first name" className="formField" />
          <input type="text" ref="authorLastName" placeholder="Author last name" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit</button>
        </form>
        <pre>
          {books.map((book, i) =>
            <li key={i} className="myList">
              {i+1}.{book.bookTitle}, {book.authors.map(author=>author.firstName + " " + author.lastName).join(",")}
              <button onClick={()=>this.fRemove(i)} className="myListButton" disabled={this.state.isButtonsDisabled}>Remove</button>
              <button onClick={()=>this.fEdit(i)} className="myListButton" disabled={this.state.isButtonsDisabled}>Edit</button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
