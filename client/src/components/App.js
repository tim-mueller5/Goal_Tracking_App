import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";


function App() {

  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
        navigate('/')
        console.log('Already logged in!')
      }
      else{
        // navigate(`/login`)
        console.log('Not logged in yet.')
      }
    });
  }, [])
  

  if (user) {
    return <Home user={user} setUser={setUser} />
  }
  else{
    return <Login setUser={setUser}/>
  }
}

export default App;
