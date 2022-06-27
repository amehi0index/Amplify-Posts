import { useState } from 'react'
import { Auth } from 'aws-amplify'
import SignIn from '../components/auth/signin/SignIn'
import SignUp from '../components/auth/signup/SignUp'

import ConfirmSignUp from '../components/auth/signup/ConfirmSignUp'
import ForgotPassword from '../components/auth/signin/ForgotPassword'
import ForgotPasswordSubmit from '../components/auth/signin/ForgotPasswordSubmit'

const UIOptions = ({ uiState, setUiState, checkUser, user }) => {
    const [formState, setFormState] = useState({
    email: '', nickname: '', password: '', authCode: ''
    })
      
    const { email, nickname, password, authCode } = formState
    function onChange(e) {
        setFormState({...formState, [e.target.name] : e.target.value })
    }

    async function signIn() {
        try {
            await Auth.signIn(email, password) 
            checkUser()
            setUiState('signedIn')
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async function signUp() {
      try {
          const { user } = await Auth.signUp({
              username : email,
              password,
              attributes: {
                email,
                nickname,
            }
          })
          console.log(user)
          setUiState('confirmSignUp')
      } catch (error) {
          console.log('error signing up:', error)
      }
  }

  async function confirmSignUp() {
    try {
        await await Auth.confirmSignUp(email, authCode)
        await Auth.signIn(email, password)
        setUiState('signedIn')
        checkUser()
    } catch (err) { console.log({ err })}
  
    }

    async function forgotPassword() {
      try {
          await Auth.forgotPassword(email) //username
          setUiState('forgotPasswordSubmit')
      } catch (error) {
          console.log({error})
      }
  }

  async function forgotPasswordSubmit() {
      try {
          await Auth.forgotPasswordSubmit(email, authCode, password)
          setUiState('signIn')
      } catch (error) {
          console.log({error})
      }
  }
    return (
        <>
            {   uiState !== 'signedIn' &&
                (
                    <>
                        {
                            uiState === 'signUp' && (
                                <SignUp onChange={onChange} setUiState={setUiState} signUp={signUp} />
                            )
                        }
                        
                        {
                            uiState === 'confirmSignUp' && (
                                <ConfirmSignUp onChange={onChange} setUiState={setUiState} confirmSignUp={confirmSignUp} />
                            )
                        }
                        {
                            uiState === 'signIn' && (
                                <SignIn onChange={onChange} setUiState={setUiState} signIn={signIn} />
                            )
                        }
                        {
                            uiState === 'forgotPassword' && (
                                <ForgotPassword onChange={onChange} setUiState={setUiState} forgotPassword={forgotPassword} />
                            )
                        }
                        {
                            uiState === 'forgotPasswordSubmit' && (
                                <ForgotPasswordSubmit onChange={onChange} forgotPasswordSubmit={forgotPasswordSubmit} />
                            )
                        } 
                    </>
                )
            }
        </>
    )
}

export default UIOptions