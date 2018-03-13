import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import formUrlEncoded from 'form-urlencoded'
import {Form,FormControl,FormGroup,Col,Checkbox,Button,ControlLabel,Row, ButtonToolbar} from 'react-bootstrap';

class LoginForm extends Component {
  constructor(props,context) {
    super(props,context);
    
    this.state = {
      userName:'',
      passWord:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.authenticate = this.authenticate.bind(this);

  }

  handleChange(e) {
    const newState = Object.assign({}, this.state, {[e.target.placeholder]: e.target.value} );
    this.setState(newState);
  }

  handleSignUp(event) {
    event.preventDefault();
    location = `${location.origin}/signup`;
  }

  async authenticate() {
    try {
      console.log('Authenticate',formUrlEncoded);
      const encodedData = formUrlEncoded(this.state);
      console.log('Encoded data ',encodedData);
      const response = await fetch(`${location.origin}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: encodedData
      });

      const {accessToken} = await response.json();
      console.log('What we got AccessToken ', accessToken);
      // It's not a good practice to store in localstorage,
      // to save time, it's been done like this.
      if(accessToken){
        localStorage.setItem('accessToken',accessToken);
        location = `${location.origin}/profile`;
      }
      else {
        this.setState({userName:'',passWord:''});
      }
    } catch (error) {
      this.setState({userName:'',passWord:''});
    }
  }
  
  render() {
    return (
      <div>
        <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="userName" value={this.state.userName} onChange={this.handleChange} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="passWord" value={this.state.passWord} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <ButtonToolbar>
              <Button bsStyle="primary" bsSize="small" onClick={this.authenticate}>
                Sign In
              </Button>
              <Button bsSize="small" onClick={this.handleSignUp} href="#">Sign Up</Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
  </div>
    );
  }
}

ReactDOM.render(<LoginForm/>,document.getElementById('root'));

