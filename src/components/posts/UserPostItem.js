import { API, Auth } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getPost } from '../../graphql/queries'
import Comments from '../comments/Comments'

export default function Post() {

    const [post, setPost] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [postAuthor, setPostAuthor] = useState('')

    let { id } = useParams()

    useEffect(() => {
        fetchPost()
    }, [])

    async function fetchPost() {
        if (!id) return
        const postData = await API.graphql({ query: getPost, variables: { id }})
        console.log('postData: ', postData)
        setPost(postData.data.getPost)  
    }   

    if (!post) return null
 
    return ( 
        <div className="container-fluid w-1/2 flex px-6">
            <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
                <div className="container-fluid  bg-purple-500 w-full h-full px-4 pb-7 my-5 rounded-sm flex flex-col"> 
                    <div class="bg-slate-700 opacity-90 flex flex-col mx-6 mt-8 py-4 px-8 rounded">
                        <h1 className="text-4xl mt-4 px-4 text-white font-semibold tracking-wide">{post.title}</h1>
                        <p className="text-sm font-light my-2">{post.owner}</p>
                        <div className=" mx-4  text-white rounded-sm flex items-center">
                            <ReactMarkdown children={post.content} />
                        </div>
                    </div>
                        <Comments postId={post.id}  />
                </div>
            </div>
        </div>
    )
}