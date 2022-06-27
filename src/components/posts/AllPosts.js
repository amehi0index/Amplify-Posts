import { useState, useEffect } from 'react'
import { Link }from 'react-router-dom'
import { API } from 'aws-amplify'
import { listPosts } from '../../graphql/queries'

const AllPosts = () => {

  const [posts, setPosts] = useState([])
    useEffect(() => {
    fetchPosts()
  }, [])
  
  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts
    })
    setPosts(postData.data.listPosts.items)
    console.log(posts)
  }

  function getDate(isoStr) {
    const formattedDate = new Date(isoStr.slice(0, -1));
    return formattedDate.toString()
  }

  return (
    <div className="container-fluid w-1/2 flex px-6">
      <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-3xl text-white font-bold">Latest Posts</p>
        <div className="container-fluid flex bg-purple-500 w-full h-full justify-center px-4 my-5 rounded-sm"> 
          <div className="flex flex-col justify-center w-full">
            {
              posts.map((post, index) => (
                <Link key={index} to={`/userpostitem/${post.id}`}>
                  <div className="cursor-pointer border-b border-gray-300	mt-4 pb-2">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-white mt-2 mb-2">Author:{post.owner}</p>
                    <p className="text-white mt-2 mb-2">Posted: {getDate(post.createdAt)}</p>
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

export default AllPosts