
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { API } from 'aws-amplify'
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { createComment } from '../../graphql/mutations'

const initialState = { content: '' }

function CreateComment() {  

    const [comment, setComment] = useState(initialState)
    
    let { id } = useParams()  //postId from Comments <- UserPostItem

    const { content } = comment

    let navigate = useNavigate();
    
    async function createNewComment() {
        if (!content) return
        await API.graphql({
        query: createComment,
        variables: { input: {content: content, postID: id} },
        authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        navigate(`/userpostitem/${id}`)  
    }
    
    return (
        <div className="container-fluid w-1/2 flex px-6">
            <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
                <p className="text-3xl text-white font-bold">New Comment</p>
                <div className="container-fluid flex  w-full h-full justify-center px-4 my-5 rounded-sm"> 
                    <div className="flex flex-col justify-center w-full">
                            
                        {/* <SimpleMDE value={comment.content} onChange={value => setComment({ ...comment, content: value })} />
                         */}
                       
                        <textarea
                            value={comment.content}
                            onChange={(e)=> setComment({ ...comment, content: e.target.value })}
                            className="border-b p-2 px-3 text-lg my-4 focus:outline-none w-full  h-full font-light text-gray-500 placeholder-gray-500 y-2 rounded"
                        />
                        <button
                            type="button"
                            className="mb-4 bg-purple-500 text-white font-semibold px-8 py-2 rounded-lg"
                            onClick={createNewComment}
                            >Add Comment
                        </button>
                    </div>
                       
                  
                </div> 
            </div>
        </div>
        
    )
}

export default CreateComment