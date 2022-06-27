import { useState, useEffect } from 'react'
import { Link }from 'react-router-dom'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { listComments } from '../../graphql/queries'
import CommentItem from './CommentItem'

const Comments = ({ postId }) => {

  const [comments, setComments] = useState([])
  const [user, setUser] = useState()
    
    useEffect(() => {
        fetchComments()
    }, [])
  
    async function fetchComments() {
      const commentData = await API.graphql(graphqlOperation(listComments, { filter: { postID: { eq:postId} } }))
      console.log(commentData)
      setComments(commentData.data.listComments.items)
      fetchUser()
    }
  
    async function fetchUser() {
      const user = await Auth.currentAuthenticatedUser()
      setUser(user.attributes.sub)
    } 
    
  return (
    <div className="container-fluid w-full flex px-6">
      <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-3xl text-white font-bold">Comments</p>
        {
          comments.map((comment, index) => (
            <CommentItem key={index} comment={comment} postId={postId} />
          ))
        }
        {user && (
          <Link  to={`/createcomment/${postId}`} className="mb-4 bg-teal-600 text-white text-center font-semibold mt-6 px-4 py-2 rounded-lg" state={postId}>
              Add Comment
          </Link>
        )}
      </div>   
    </div>   
  )
}

export default Comments