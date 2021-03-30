import React, { useState, useEffect } from "react";
import axios from 'axios';
// Set up the initial context 
export const AccountContext = React.createContext()
// Create a exportable consumer that can be put in components to access the provider
export const AccountConsumer = AccountContext.Consumer;
// create the provider to store anything we want accessed globally
const AccountProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", membership: "" })
  useEffect( () => {
    axios.get("/api/users")
      .then( res => setUser(res.data))
      .catch( err => console.log(err))
  }, []) // only re render if there is a change
  const updateAccount = (id, user) => {
    axios.put(`/api/users/${id}`, { user })
      .then( res => setUser(res.data))
      .catch( err => console.log(err)) 
  }
  return(
    <AccountContext.Provider value={{
      ...user,
      updateAccount: updateAccount
    }}>
      { children }
    </AccountContext.Provider>
  )
}
export default AccountProvider;