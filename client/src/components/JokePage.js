import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axioswithAuth';

const JokePage = () => {
  const [jokeList, setJokeList] = useState([]);



  useEffect(() => {
    getJokes();
  }, []);

  const getJokes = () => {

    axiosWithAuth()
    .get('http://localhost:3300/api/jokes')
    .then(res => {
      console.log(res.data);
      setJokeList(res.data)
    });

}

  return (
    <>
    <h1>Joke list</h1>
    <div className='jokestuff'>
      
      <div className="jokelist">
      {jokeList.length ? (
        jokeList.map(joke =>
          <>
          <div className="jokecard">
             <p>Joke: {joke.joke}</p>
             </div>
             </>
             )
      ) : (
        <p>You must be logged in to view</p>
      )}
      </div>
    </div>
    </>
  );
};

export default JokePage;
