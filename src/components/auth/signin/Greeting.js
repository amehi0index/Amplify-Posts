import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa'

const Greeting = ({ user, setUser, setUiState }) => {
   let navigate = useNavigate()
  
  const clickHandler = () => {
    Auth.signOut() 
    setUser(null)
    setUiState('homeIn')
    navigate('/')
  }

  return (
    <div className="flex items-center flex-shrink-0 justify-between" >
     <p className="hidden md:block  text-white mr-4">Welcome, {user}</p>
      <span className="md:hidden bg-slate-700 hover:bg-slate-800 lg:px-4 px-2 py-2 mr-2 rounded"> 
        <FaUserAlt size="16" className="text-white "/>
      </span> 

      <button 
        className= "text-white text-sm md:text-md bg-slate-700 hover:bg-slate-800 lg:px-4 px-2 py-2 rounded"
        onClick={clickHandler}
      >
        <span className="hidden lg:block">Sign Out</span>
        <span className="lg:hidden flex items-center"> 
          <FaSignOutAlt size="18" className="text-white"/>
        </span>             
      </button>
    </div>
  )
}

export default Greeting