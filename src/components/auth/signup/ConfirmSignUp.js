
import Input from '../../Input'

const ConfirmSignUp = ({ onChange, setUiState, confirmSignUp }) => {
  return (
    <div className="sm:w-540 mt-12 bg-white py-9 px-12 rounded shadow-lg">
      <p className="text-3xl font-black">Confirm Sign Up</p>

      <div className="mt-10">
        <label className="text-sm">Confirmation Code</label>
        <Input onChange={onChange} name="authCode" />
      </div>

      <button
        onClick={() => confirmSignUp()}
        className="text-white w-full mt-4 bg-slate-700 hover:bg-slate-800 p-3 rounded">
        Continue
      </button>
        
      <button
        onClick={() => setUiState('signIn')}
        className="text-sm mt-6 text-teal-500">Cancel
      </button>     
    </div>
  )
}

export default ConfirmSignUp