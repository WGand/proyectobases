import React, {useContext, Component, useEffect, useState} from "react";
import axios from 'axios';
import qs from 'qs';

export default function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  postWhatever()
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://proyectobases1.herokuapp.com/prueba")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.user_id}>
            {item.username}
          </li>
        ))}
      </ul>
    );
  }
}

function postWhatever(){
  axios({
    method: 'post',
    url: 'https://proyectobases1.herokuapp.com/prueba',
    data: qs.stringify({
      username: 'value3',
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })  
}

