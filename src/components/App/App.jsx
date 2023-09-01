import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Suggestions from '../Suggestions/Suggestions';
import { GoogleLogin } from 'react-google-login';
import toast, { Toaster } from 'react-hot-toast';
import { API_SERVER, CLIENT_ID, GOOGLE_LOGIN_SCOPES } from '../../constants/constants';
import { Hourglass } from 'react-loader-spinner'

const App = () => {
  const [snippets, setSnippets] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken'));

  const onGoogleLoginSuccess = (response) => {
    localStorage.setItem('accessToken', response.accessToken);
    setAccessToken(response.accessToken);
    setIsLoggedIn(true);
    toast.success('Google Login Success');
  };

  const onGoogleLoginFailure = (error) => {
    localStorage.removeItem('accessToken');
    toast.error('Google Login Failed');
  }

  const onLogoutClick = () => {
    setAccessToken('');
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
  } 

  useEffect(() => {
    if(!accessToken) {
      return;
    }
    setIsLoading(true)
    axios.post(`${API_SERVER}analyze-emails`,{ accessToken: accessToken}).then(res => {
        setSnippets(res.data.snippets);
        setIsLoading(false);
        setIsLoggedIn(true);
    }).catch((error) =>  {
      localStorage.removeItem('accessToken');
      setIsLoading(false);
      console.error('Error analyzing emails:', error);
      toast.error(`Error while analysing your sent emails: ${error.message}`);
   })
  }, [accessToken])


  return (
    <div className="App">
       <Toaster />
       <h1 style={{marginBottom:"3rem"}}>Email Analysis App</h1>
       
       {/* Loading spinner when data is loading */}
       {isLoading && <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
      />}

      {/* Google Login button when not logged in */}
      {!isLoading && !isLoggedIn && <GoogleLogin
        clientId={CLIENT_ID}
       // buttonText="Sign in with Google"
        buttonText="Analyze my emails"
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
        scope={GOOGLE_LOGIN_SCOPES}
        theme='dark'
      />}
     
      {/* Render Suggestions component when logged in and snippets are available */}
      {!isLoading && isLoggedIn && snippets.length > 0 && (
       <Suggestions suggestions={snippets}/>
      )}

      {/* Display a message when logged in but no snippets available */}
      {!isLoading && isLoggedIn && snippets.length === 0 && (
       <div style={{marginBottom:'3rem'}}>Opps! You do not have any suggestions!</div>
      )}

      {/* Logout button when logged in */}
      {!isLoading && isLoggedIn && <button type="button" className="btn btn-danger" onClick={onLogoutClick}>Logout</button>}
    </div>
  );
};

export default App;
