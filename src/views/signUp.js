import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import formUrlEncoded from 'form-urlencoded'
import {Form,FormControl,FormGroup,Col,Checkbox,Button,ControlLabel,Row,ButtonToolbar,HelpBlock,Radio} from 'react-bootstrap';


function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class SignUpForm extends Component {
  constructor(props,context) {
    super(props,context);
    
    this.state = {
      userName:'',
      passWord:'',
      email:'',
      lastName:'',
      firstName:'',
      country:'',
      gender:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.saveUserToDB = this.saveUserToDB.bind(this);
  }

  handleRadio(e) {
    console.log(e.target.parentElement.title);
    const newState = Object.assign({}, this.state, {gender: e.target.parentElement.title.toLowerCase()} );
    this.setState(newState);
    console.log(this.state);
  }

  handleChange(e) {
    console.log(e.target.id,' ---- ',e.target.value);
    const newState = Object.assign({}, this.state, {[e.target.id]: e.target.value} );
    this.setState(newState);
  }

  saveUserToDB(event) {
    console.log('saveUserToDB',formUrlEncoded);
    const encodedData = formUrlEncoded(this.state);
    console.log('Encoded data ',encodedData);
    fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: encodedData
    });
  }

  render() {
    return (
        <form>
          <FieldGroup
            id="userName"
            type="text"
            label="Username"
            placeholder="Enter Username"
            value={this.state.userName}
            onChange={this.handleChange}
          />

          <FieldGroup
            id="passWord"
            type="password"
            label="passWord"
            value={this.state.passWord}
            placeholder="Enter password"
            onChange={this.handleChange}
            />

        <FieldGroup
            id="email"
            type="email"
            label="email"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={this.handleChange}
        />

        <FieldGroup
            id="lastName"
            type="text"
            label="lastName"
            value={this.state.lastName}
            placeholder="Enter lastname"
            onChange={this.handleChange}
          />

        <FieldGroup
          id="firstName"
          type="text"
          label="firstName"
          value={this.state.firstName}
          placeholder="Enter first name"
          onChange={this.handleChange}
        />

        <FieldGroup
          id="country"
          type="text"
          label="country"
          value={this.state.country}
          placeholder="Enter country name"
          onChange={this.handleChange}
        />
         
        <FormGroup onChange={this.handleRadio}>
            Gender
            <Radio name="radioGroup" title="Male" inline>
                Male
            </Radio>{' '}
            <Radio name="radioGroup" title="Female" inline>
                Female
            </Radio>{' '}
        </FormGroup>
          
        <Button onClick={this.saveUserToDB}>Submit</Button>
        </form>
      );
  }
}

ReactDOM.render(<SignUpForm/>,document.getElementById('root'));

