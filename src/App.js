import React from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
const config = require('./config.json');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response : null
    }
  }

  responseGoogle = (response) => {
    this.setState(prevState=>{
      return prevState.response = response;
    });
  }

  render() {
    if (this.state.response === null) {
      return (
        <GoogleLogin
          clientId={config.google_client_id}
          autoLoad={true}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          scope={'profile email https://www.googleapis.com/auth/calendar'}
        />
      );
    }
    else if (this.state.response.error) {
      return(
        <h3>Please allows allow popup for this site. Currently popup blocked by browser</h3>
      );
    }
    else {
      return(
        <div>
          <p>
            <h3>ID Token:</h3>
            <span>{this.state.response.tokenId}</span>
          </p>
          <p>
            <h3>Access Token:</h3>
            <span>{this.state.response.accessToken}</span>
          </p>
          <p>
            <h3>Raw Object:</h3>
            <span>{JSON.stringify(this.state.response)}</span>
          </p>
        </div>
      );
    }
  }
}

export default App;
