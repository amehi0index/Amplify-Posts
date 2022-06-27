import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Auth } from 'aws-amplify'

function SocialSignIn() {
  return (
    <div className="flex flex-col justify-evenly">
      <button className="mt-4 focus:outline-none" onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
        <div className="flex border border-gray-300 p-2 rounded items-center ">
          <FaGoogle size="30" className="text-red-600"/>
          <p className="ml-3">Sign in with Google</p>
        </div>
      </button>
      <button className="mt-4 focus:outline-none" onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
        <div className="flex border border-gray-300 p-2 rounded items-center">
          <FaFacebook size="30" className="text-blue-600"/>
          <p className="ml-3">Sign in with Facebook</p>
        </div>
      </button>
    </div>
  )
}

export default SocialSignIn