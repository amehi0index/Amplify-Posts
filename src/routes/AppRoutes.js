
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../pages/Navbar'
import SignIn from '../components/auth/signin/SignIn';
import SignUp from '../components/auth/signup/SignUp';
import CreatePost from '../components/posts/CreatePost';
import UserPosts from '../components/posts/UserPosts';
import UserPostItem from '../components/posts/UserPostItem';
import EditPost from '../components/posts/EditPost';
import EditComment from '../components/comments/EditComment';
import UIOptions from '../pages/UIOptions';
import CreateComment from '../components/comments/CreateComment';

const AppRoutes = ({ user, setUser, checkUser, uiState, setUiState }) => {

  return (
   <Router>
      <Navbar
        uiState={uiState}
        setUiState={setUiState}
        user={user} setUser={setUser}
        checkUser={checkUser}
      />
        <div className="relative w-full flex justify-between">
          <div className="container-fluid w-full flex justify-around p-6" >

          <UIOptions
            uiState={uiState}
            setUiState={setUiState}
            checkUser={checkUser}
            user={user}
          />
          
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='signin' element={<SignIn/>}/>
              <Route path= 'signup' element={<SignUp/>}/>
              <Route path='createpost' element={<CreatePost />} />
              <Route path='userposts' element={<UserPosts />} />
              <Route path='userpostitem/:id' element={<UserPostItem />} />
              <Route path='editpost/:id' element={<EditPost />} />
              <Route path='editpost' element={<EditPost />} />
              <Route path='editcomment/:id' element={<EditComment />} />
              <Route path='editcomment' element={<EditComment />} /> 
              <Route path='createcomment/:id' element={<CreateComment />} /> 
            </Routes>    
          </div>
        </div>
      </Router>
  )
}

export default AppRoutes