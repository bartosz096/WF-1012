import React, {Component} from 'react'
import Form from './Form'
const styles = require('./App.css');


  class App extends Component {
    state = {
      emails: ['User_1@miten.pl', 'User.2@miten.pl', 'User-3@miten.pl'],
      passwords: ['Pass1!', 'Pass2!', 'Pass3!'],
    }

    handleSubmit = (email:string,password:string) => { 
      this.setState({emails: [...this.state.emails, email]})
      this.setState({passwords: [...this.state.passwords, password]})
      console.log(this.state.emails);
      console.log(this.state.passwords);
    }

    render(){
      return (

            <Form emails={this.state.emails} passwords={this.state.passwords} handleSubmit={this.handleSubmit} />
      )
    }
  }

export default App;
