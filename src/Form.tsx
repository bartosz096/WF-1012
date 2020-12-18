import React, {Component} from 'react'
import * as EmailValidator from 'email-validator';

type AppProps = {
  emails: string[],
  passwords: string[],
  handleSubmit: any,
}

 class Form extends Component<AppProps> {
   state = {
     emails: '',
     passwords: '',
     login: false,
   }

   componentDidMount = () => {
     (document.getElementById('emailInfo')as HTMLInputElement).style.visibility = 'hidden';
   }

   correctPass = (email:string,password:string) => {
     const emails:string[]=this.props.emails;
     const passwords:string[]=this.props.passwords;
     for (let i=0; i<emails.length; i++){
       if(email===emails[i] && password===passwords[i])
         return true
     }
     alert("niepoprawne haslo");
     return false
   }

   emailValidate = (email:string) => {
     if(EmailValidator.validate(email)){
       return true
     } else {
       alert('niepoprawny email');
       return false
     }
   }

   passValidate = (pass:string) => {
     var passwordValidator = require('password-validator');
     var schema = new passwordValidator();
     schema
     .is().min(5)
     .has().uppercase()
     .has().lowercase()
     .has().digits()
     .has().symbols()
     if(schema.validate(pass)){
       return true;
     } else {
       alert('haslo musi zawierac min. 5 znaków, jeden małą i wielka litera oraz jeden znak specjalny');
       return false;
     }
   }

   checkUser = () => {
     const emails:string[]=this.props.emails;
     const email:string=this.state.emails;
     for (let i=0; i<emails.length; i++){
       if(email===emails[i]){
         alert('uzytkownik juz istnieje');
         return false;
       }
     }
     return true;
   }

   addUser = () => {
       const email:string=this.state.emails;
       const password:string=this.state.passwords;
       const valiteadeEmail:boolean = this.emailValidate(email);
       const valiteadePass:boolean = this.passValidate(password);
       const checkUser:boolean = this.checkUser();
         if (valiteadeEmail && valiteadePass && checkUser){
           console.log('dodano usera');
           this.props.handleSubmit(this.state.emails, this.state.passwords)
           alert('stworzono uzytkownika');
         }
   }

   handleChange = (event:any):void => {
     const {name, value} = event.target
     this.setState({
       [name]: value,
     })
   }

   login = () => {
     const email:string=this.state.emails;
     const pass:string=this.state.passwords;
     const correctPassword:boolean = this.correctPass(email,pass);
     if (correctPassword && email.length>0){ 
       alert('zalogowano poprawnie');
       (document.getElementById('emailInfo')as HTMLInputElement).style.visibility = 'visible';
       this.setState({
         login: true,
       })
       return true;
     }
   }

   emailInfo = () => {
       return alert(this.state.emails);
   }

   logout = () => {
     if (this.state.login === true){
       (document.getElementById('emailInfo')as HTMLInputElement).style.visibility = 'hidden';
       alert('wylogowano poprawnie');
       this.setState({
         emails: '',
         passwords: '',
         login: false,
       })
       return true;
     }
   }

  render(){
    return (
      <form className="Form1" id="Form1">
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="emails"
          id="emails"
          value={this.state.emails}
          onChange={this.handleChange} />
        <label htmlFor="password">  password</label>
        <input
          type="password"
          name="passwords"
          id="passwords"
          value={this.state.passwords}
          onChange={this.handleChange} />
        <input type="button" value="Register" id="buttonRegister" onClick={this.addUser} />
        <input type="button" value="Login" id="buttonLogin" onClick={this.login} />
        <input type="button" value="Logout" id="buttonLogout" onClick={this.logout} />
        <div>
          <a id="emailInfo" onClick={this.emailInfo}>click to see your email</a>
        </div>
      </form>
    )
  }
}

  export default Form
