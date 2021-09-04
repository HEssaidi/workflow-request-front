import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { FcGoogle } from 'react-icons/fc';
import Login from '../actions/services/Login';





const CLIENT_ID = '1004740022236-7a24u0ftp8ca1vjsiujimuvd6klmqgjc.apps.googleusercontent.com';


class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  async login(response) {
    if (response.accessToken) {
      localStorage.setItem("isLogined", true);
      this.setState(state => ({
        accessToken: response.accessToken
      }));
      console.log(response)
      localStorage.setItem("token", response.accessToken)


      const resp = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + response.accessToken)
      const dataUser = await resp.json()
      console.log(dataUser)
      console.log(dataUser.family_name)
      console.log(dataUser.given_name)
      //Storing userdetails data 
      localStorage.setItem("username", dataUser.name);
      localStorage.setItem("lastname", dataUser.family_name);
      localStorage.setItem("firstname", dataUser.given_name);
      localStorage.setItem("email", dataUser.email);
      localStorage.setItem("picture", dataUser.picture);
      Login.getUserByEmail(dataUser.email)
          .then(data => {
            this.setState({
              user: data.data,
          });
          localStorage.setItem("user", data.data);
          });
      Login.getGroupsByUserEmail(dataUser.email)
          .then(data => {
            this.setState({
              userGrp: data.data,
          });
          localStorage.setItem("userGrp", data.data.id);
          });
      this.props.history.push('/') 

    }
  }



  logout(response) {
    localStorage.setItem("isLogined", false);
    this.setState(state => ({
      // isLogined: localStorage.getItem("isLogined"),
      accessToken: ''
    }));
    localStorage.clear()
  }

  handleLoginFailure(response) {
    alert('Failed to log in')
  }

  handleLogoutFailure(response) {
    alert('Failed to log out')
  }

  render() {
    const isLoggedIn = localStorage.getItem("isLogined")
    console.log("isLoggedIn"+isLoggedIn)
    console.log("this.state.isLogined type of "+typeof isLoggedIn)
    return (
      <div>
        { (isLoggedIn === "true") ?
          <GoogleLogout                     //check this out if you need to logged out
            clientId={CLIENT_ID}
            render={renderProps => (
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<FcGoogle />}
              >
                Logout
              </Button>
            )}
            buttonText='Logout'
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          >
          </GoogleLogout> : <GoogleLogin
            clientId={CLIENT_ID}
            render={renderProps => (
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary" 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<FcGoogle />}
              >
                Sign In with google
              </Button>
            )}
            buttonText='Login'
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
          />
        }
      </div>
    )
  }
}

export default withRouter(GoogleBtn);