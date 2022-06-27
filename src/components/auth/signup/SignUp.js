
import Input from '../../Input';

const SignUp = ({ onChange, setUiState, signUp }) => {
  return (
    <div className="sm:w-540 mt-12 bg-white py-9 px-12 rounded shadow-lg">
      <p className="text-3xl font-black">Sign Up</p>

      <div className="mt-6">
        <label className="text-sm">Username</label>
        <Input onChange={onChange} name="nickname" />
      </div>

      <div className="mt-6">
        <label className="text-sm">Email</label>
        <Input onChange={onChange} name="email" />
      </div>

      <div className="mt-7">
        <label className="text-sm flex justify-between">
          <span>Password</span>
          <span
              className="ml-8 sm:ml-48 text-teal-500 cursor-pointer"
          >(Minimum 8 Characters)</span>
        </label>
        <Input type="password" name="password" onChange={onChange} />
      </div>

      <button onClick={signUp} className="text-white w-full mt-7 bg-teal-600 hover:bg-teal-700 p-3 rounded">
        Sign Up
      </button>

      <p className="mt-12 text-base font-light">
        Don't have an account?
        <span
          onClick={() => setUiState('signIn')}
          role="button"
          className="cursor-pointer text-teal-500 "> Sign In</span>
      </p>
    </div>    
  )
}

export default SignUp