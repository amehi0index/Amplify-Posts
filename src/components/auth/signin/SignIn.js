import SocialSignIn from './SocialSignin'
import Input from '../../Input'

const Signin = ({ onChange, setUiState, signIn }) => {
  return (
    <div className="sm:w-540 mt-12 bg-white py-9 px-12 rounded shadow-lg">
      <p className="text-3xl font-black">Sign In</p>

      <div className="mt-6">
        <label className="text-sm">Email</label>
        <Input onChange={onChange} name="email" />
      </div>

      <div className="mt-7">
        <label className="text-sm flex justify-between">
          <span>Password</span>
          <span
            onClick={() => setUiState('forgotPassword')}
            className="ml-8 sm:ml-48 text-teal-500 cursor-pointer"
          >Forgot your password?</span>
        </label>
        <Input type="password" name="password" onChange={onChange} />
      </div>

      <button onClick={signIn} className="text-white w-full mt-6 bg-teal-600 hover:bg-teal-700 p-3 rounded">
        Continue
      </button>

      <SocialSignIn />

      <p className="mt-6 text-base font-light">
        Don't have an account?
        <span
          onClick={() => setUiState('signUp')}
          role="button"
          className="cursor-pointer text-teal-600"> Sign Up</span>
      </p>
    </div>
  )
}

export default Signin