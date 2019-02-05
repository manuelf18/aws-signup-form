import React, { Component } from 'react';
import axios from 'axios';

class CustomForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fullname: '',
        email: '',
        username: ''
      };
    }
  
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }
  
    handleSubmit = async event => {
        event.preventDefault();
        const { username, fullname, email } = this.state,
              GITHUB_API_URL = 'https://api.github.com/users',
              AMAZON_GATEWAY_URL = process.env.REACT_APP_AWS_API_GATEWAY_KEY;
        if( username ){
            try {
                // Verify that the user exists
                const context = { fullname, email, username };
                const userResponse = await axios.get(`${GITHUB_API_URL}/${username}`);
                const lambdaResponse = await axios.post(AMAZON_GATEWAY_URL, context);
    
                // User Response
                console.log('Response from user: ');
                console.log(userResponse);
    
                // Lambda Response
                console.log('Response from lambda: ');
                console.log(lambdaResponse);
                alert('Success in POST');
            } catch(e) {
                // statements
                console.log(e);
                alert('Fail in POST');
            }
        }
    }
  
    render() {
      return (
        <div className="container offset-md-3">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Fullname:</label>
                    <input name='fullname' className="form-control col-sm-12 col-md-8" type="text" value={this.state.fullname} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Email Adress:</label>
                    <input name='email' className="form-control col-sm-12 col-md-8" type="email" value={this.state.email} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label> Github Username:</label>
                    <input name='username' className="form-control col-sm-12 col-md-8" type="text" value={this.state.username} onChange={this.handleChange} />
                </div>
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </form>
        </div>
      );
    }
  }

  export default CustomForm;