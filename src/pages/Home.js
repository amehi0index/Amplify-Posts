

import  Amplify from 'aws-amplify'
import config from '../aws-exports'
import AllPosts from '../components/posts/AllPosts'
Amplify.configure(config)

function Home({ uiState, setUiState, checkUser }) {
 
  return (
    <AllPosts />
  )

}
export default Home
