
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { API } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { createPost } from '../../graphql/mutations'

const initialState = { title: '', content: '' }

function CreatePost() {

  const [post, setPost] = useState(initialState)

  const { title, content } = post

  let navigate = useNavigate()
    
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }
    
  async function createNewPost() {

    if (!title || !content) return

    const id = uuid()
    post.id = id

    await API.graphql({
      query: createPost,
      variables: { input: post },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    
    navigate('/userposts')
  }
    
  return (
    <div className="container-fluid w-1/2 flex px-6">
      <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-3xl text-white font-bold">Create A Post</p>
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
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                className="border-b p-2 text-lg my-4 focus:outline-none w-full  h-64 font-light text-gray-500 placeholder-gray-500 y-2 rounded"
              />
            <button
              type="button"
              className="mb-4 bg-purple-500 text-white font-semibold px-8 py-2 rounded-lg"
              onClick={createNewPost}
            >Create Post</button>
          </div> 
        </div>
      </div>
    </div>    
  )
}

// export default withAuthenticator(CreatePost)
export default CreatePost