import { useState } from 'react'
import { API } from 'aws-amplify'
import { useNavigate, useLocation } from 'react-router-dom'
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { updatePost } from '../../graphql/mutations'

function EditPost() {

  const location = useLocation()
  const data = location.state
  const [post, setPost] = useState(data)

  let navigate = useNavigate()

  if (!post) return null
    
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }
    
  const { title, content, id } = post

  async function updateCurrentPost() {
    if (!title) return
    const postUpdated = {
      id, content, title
    }
    await API.graphql({
      query: updatePost,
      variables: { input: postUpdated },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    navigate('/userposts')
  }

  return (
   <div className="container-fluid w-1/2 flex px-6">
      <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-3xl text-white font-bold">Edit Post</p>
        <div className="container-fluid flex  w-full h-full justify-center px-4 my-5 rounded-sm"> 
          <div className="flex flex-col justify-center w-full">
            <input
              onChange={onChange}
              name="title"
              placeholder="Title"
              value={post.title}
              className="border-b pb-2 text-lg my-4 p-2 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2 rounded"
            /> 
            {/* <SimpleMDE value={post.content} onChange={value => setPost({ ...post, content: value })} /> */}
            <textarea
              value={post.content}
              onChange={e => setPost({ ...post, content: e.target.value })}
              className="border-b p-2 text-lg my-4 focus:outline-none w-full  h-64 font-light text-gray-500 placeholder-gray-500 y-2 rounded"
            />
            <button
             className="mb-4 bg-teal-600 text-white font-semibold px-8 py-2 rounded-lg"
              onClick={updateCurrentPost}>Update Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost 