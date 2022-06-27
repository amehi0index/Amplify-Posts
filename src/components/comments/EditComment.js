import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { updateComment } from '../../graphql/mutations'
import { getComment } from '../../graphql/queries'

const EditComment = () => {
  const location = useLocation()
  const postId = location.state

  const [comment, setComment] = useState(null)
  let { id } = useParams()  //comment id

  let navigate = useNavigate()

  useEffect(() => {
    fetchComment()
  }, [])

  async function fetchComment() {
    if (!id) return
    const commentData = await API.graphql({ query: getComment, variables: { id }})
    setComment(commentData.data.getComment)
  }
    
  if (!comment) return null
   
  async function updateCurrentComment() {
    const { content, id } = comment
    if (!content) return
    
    const commentUpdated = {
      id, content
    }

    await API.graphql({
      query: updateComment,
      variables: { input: commentUpdated },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })

    navigate(`/userpostitem/${postId}`) 
  }

  return (
   <div className="container-fluid w-1/2 flex px-6">
      <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-3xl text-white font-bold">Edit Comment</p>
        <div className="container-fluid flex  w-full h-full justify-center px-4 my-5 rounded-sm"> 
          <div className="flex flex-col justify-center w-full">
            {/* <SimpleMDE value={comment.content} onChange={value => setComment({ ...comment, content: value })} /> */}
            <textarea
              value={comment.content}
              onChange={(e) => setComment({ ...comment, content: e.target.value })}
              className="border-b pb-2 text-lg my-4 focus:outline-none w-full  h-64 font-light text-gray-500 placeholder-gray-500 y-2 rounded"
            />
            <button
              className="mb-4 bg-teal-600 text-white font-semibold px-8 py-2 rounded-lg"
              onClick={updateCurrentComment}>Update Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditComment