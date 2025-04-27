import React,{Children, useEffect,useState} from "react"
import UserContext from "./UserContext.js"
import axios from "axios";


 function UserContextProvider({children}) {
    const [user,setUser]=useState(null);
    const [ready,setReady]=useState(false);
    useEffect(() => {
      if (!user) {
        axios
          .get("/user/profile")
          .then(({ data }) => {
            setUser(data.data);
            setReady(true);
          })
          .catch((err) => console.log(err));
      }
    },[]);
    return (

    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;