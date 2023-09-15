import React, { useEffect } from "react";
import Login from "./Login";
import Home from "./Home";
import { UserContext } from "../context/user";
import { useContext } from "react";


function App() {

  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
      else{
        console.log('Not logged in yet.')
      }
    });
  }, [])
  

  if (user) {
    return (
      <Home/>
    )
  }
  else{
    return <Login/>
  }
}

export default App;
