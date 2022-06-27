import React from 'react'
import Input from '../../Input'

const ForgotPasswordSubmit = ({ onChange, forgotPasswordSubmit }) => {
    return (

        <div>
            <p className="text-3xl font-black">Confirm new password</p>
  
            <div className="mt-10">
                <label htmlFor="email" className="text-sm">Confirmation Code</label>
                <Input onChange={onChange} name="authCode"/>
            </div>

            <div className="mt-6">
                <label className="text-sm">
                    New Password
                </label>
                <Input type="password" name="password" onChange={onChange} />
            </div>

            <button 
                className="text-white w-full mt-6 bg-slate-700 hover:bg-slate-800 p-3 rounded" 
                onClick={() => forgotPasswordSubmit()}
            >New Password
            </button>

        </div>
    )
}

export default ForgotPasswordSubmit