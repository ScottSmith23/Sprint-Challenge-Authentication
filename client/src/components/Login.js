import React, { useState } from 'react';

import axios from 'axios';

const Login = (props) => {
  const [state,setState] = useState({
    credentials: {
      username: '',
      password: ''
    }
  })

  const handleChange = e => {
    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const login = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/api/auth/login/', state.credentials)
      .then(res => {
        console.log(res.data.token);
        localStorage.setItem('token', JSON.stringify(res.data.token));
        props.history.push('/jokes');
      })
      .catch(err => console.log(err));
  };

    return (
      <div>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={state.credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={state.credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
}

export default Login;
