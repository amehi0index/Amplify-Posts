
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';
// import { postsByUsername } from '../graphql/queries';
import Greeting from '../components/auth/signin/Greeting'

function Navbar({ uiState, setUiState, user, setUser }) {

  const clickHandler = () => {
    setUiState('signIn')
  }

    return (
      <nav className="relative w-full flex  items-center justify-between bg-gradient-to-r from-teal-600 p-6">
        <div className="container-fluid w-full flex  items-center justify-between">

          <div className="container-fluid w-full flex justify-between">

            <div class="flex items-center flex-shrink-0 text-white mr-6">
              <Link to="/">
                <span class="font-semibold text-xl">NotReddit</span>
              </Link>
            </div> 

            {
              uiState !== ('signedIn') && (
                <div className="cursor-pointer" onClick={clickHandler}>
                  <FaUserCircle size="24" className="text-white" />
                </div>
              )
            }
         
            {
              uiState === ('signedIn') && ( 
                <div className="flex w-4/5 items-center text-white justify-between">
                  <div>

                  <Link to="/userposts" >
                    <span className="mr-6 cursor-pointer">My Posts</span>
                  </Link>
                    
                  <Link to="/createpost">
                    <span className="mr-6 cursor-pointer">Create Post</span>
                  </Link>
                  </div>
               
                  <Greeting user={user} setUser={setUser} setUiState={setUiState} />
                </div>
              )
            }

          </div>
        </div>
      </nav>
    )
  }
  
  export default Navbar
  