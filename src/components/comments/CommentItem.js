import React, { useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteComment as deleteCommentMutation } from '../../graphql/mutations'

const CommentItem = ({ comment, postId }) => {

    const [username, setUsername] = useState()
    const [commentAuthor, setCommentAuthor] = useState('')
   
    let navigate = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])

    async function fetchUser() {
        const user = await Auth.currentAuthenticatedUser()
        // console.log('user', user.attributes.email)
        setCommentAuthor(user.attributes.email)
        setUsername(user.username)
        console.log('username', user.username)
        console.log('comment owner', comment.owner)
    } 
 
    function getDate(isoStr) {
        const formattedDate = new Date(isoStr.slice(0, -1))
        return formattedDate.toString()
    }
    
    async function deleteComment(id) {
        await API.graphql({
        query: deleteCommentMutation,
        variables: { input: { id } },
        authMode: "AMAZON_COGNITO_USER_POOLS"
    })

        //navigate(`/userpostitem/${postId}`)  
        navigate("/") 
    }

    // async function fetchPost(id) {
    //     if (!id) return
    //     await API.graphql({ query: getPost, variables: { id }})
    // }

    return (
        <div className="cursor-pointer border-b border-gray-300	mt-4 pb-2">
            <p className="text-white mt-2 mb-2">{commentAuthor} says: </p>
            <p className="text-white mt-2 mb-2">{comment.content}</p>
            <p className="text-white mt-2 mb-2">Posted: {getDate(comment.createdAt)}</p>
            <div  className="flex w-full items-end justify-end">
                {username === comment.owner && (
                    <div>
                        <Link to={`/editcomment/${comment.id}`} state={postId} >
                            <span className="text-sm text-gray-200 mr-4 cursor-pointer">Edit</span>
                        </Link>
                        <button
                            className="text-sm text-gray-200 cursor-pointer mr-4"
                            onClick={() => deleteComment(comment.id)}
                        >Delete 
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentItem