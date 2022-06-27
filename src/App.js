import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [uiState, setUiState] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(()=> {
    checkUser()
    setUiState('homeIn')
  }, [])

  async function checkUser(){
    try {
      
      const user = await Auth.currentAuthenticatedUser()
      const { email, nickname } = user.attributes
      setUser(()=> nickname ? nickname : email)
      setUiState('signedIn')
      } catch (error) {
        setUser(null)
      //setUiState('signIn')
    }
  }

  return (
    <AppRoutes
      user={user}
      setUser={setUser}
      checkUser={checkUser}
      uiState={uiState}
      setUiState={setUiState}
    />
  )
}

export default App