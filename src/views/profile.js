import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import formUrlEncoded from 'form-urlencoded'
import {Table} from 'react-bootstrap';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }

  async componentDidMount(){
    // It's not a good practice to store in localstorage,
    // to save time, it's been done like this.
    const accessToken = localStorage.getItem('accessToken');
    console.log('Authenticate',formUrlEncoded);
    const encodedData = formUrlEncoded(this.state);
    console.log('Encoded data ',encodedData);
    const response = await fetch(`${location.origin}/signup/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const {status,data} = await response.json();
    console.log(status,data);
    this.setState({data});
  };

  render() {
    return (
      <div>
      <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Password</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Country</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
      {this.state.data.forEach((item, index) => (
        <tr>
          <td>++index</td>
          <td>{item.value.userName}</td>
          <td>{item.value.passWord}</td>
          <td>{item.value.firstName}</td>
          <td>{item.value.lastName}</td>
          <td>{item.value.country}</td>
          <td>{item.value.email}</td>
          <td>{item.value.gender}</td>
        </tr>
     ))}
     </tbody>
    </Table>
  </div>
    );
  }
}

ReactDOM.render(<Profile/>,document.getElementById('root'));