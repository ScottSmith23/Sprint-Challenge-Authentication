import React, { useState } from 'react';

import axios from 'axios';

const Register = (props) => {
  const [state,setState] = useState({
    credentials: {
      username: '',
      password: '',
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

  const register = e => {
    e.preventDefault();
    console.log(state.credentials)
    axios
      .post('/api/auth/register', state.credentials)
      .then(res => {
        console.log(res);
        props.history.push('/');
      })
      .catch(err => console.log(err));
  };

    return (
      <div>
        <form onSubmit={register}>
          <p>username</p>
          <input
            type="text"
            name="username"
            value={state.credentials.username}
            onChange={handleChange}
          />
          <p>password</p>
          <input
            type="password"
            name="password"
            value={state.credentials.password}
            onChange={handleChange}
          />
          <button>REGISTER!</button>
        </form>
      </div>
    );
}

export default Register;
