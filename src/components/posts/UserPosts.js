import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API, Auth } from 'aws-amplify'
import { listPosts } from '../../graphql/queries'
import { deletePost as deletePostMutation } from '../../graphql/mutations'

const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])
    
  async function fetchPosts() {
      
  const { username } = await Auth.currentAuthenticatedUser()
    
  const postData = await API.graphql({
    query: listPosts
  })
 
  const userPostList = postData.data.listPosts.items.filter(item => item.owner === username)
  setPosts(userPostList)
}

  async function deletePost(id) {
    await API.graphql({
      query: deletePostMutation,
      variables: { input: { id } },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    fetchPosts()
  }
 
  return (
    <div className="container-fluid w-1/2 flex px-6">
      <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-3xl text-white font-bold">My Posts</p>
        <div className="container-fluid flex bg-purple-500 w-full h-full justify-center px-4 my-5 rounded-sm"> 
          <div className="flex flex-col justify-center w-full">
            {
              posts.map((post, index) => (
                <Link key={index} to={`/userpostitem/${post.id}`}>
                  <div key={index} className="border-b border-gray-300	mt-4 pb-2">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-white mt-2 mb-2">Author: {post.owner}</p>
                  
                    <Link to={`/editpost/${post.id}`} state={post}>
                      <span className="text-sm mr-4 cursor-pointer">Edit Post</span>
                    </Link>

                    <Link to={`/userpostitem/${post.id}`} state={post}>
                      <span className="text-sm mr-4 cursor-pointer">View Post</span>
                    </Link>
                
                    <button
                      className="text-sm mr-4"
                      onClick={() => deletePost(post.id)}
                    >Delete Post</button>
                  </div>
              </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPosts