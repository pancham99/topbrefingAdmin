import  { useState, useContext } from 'react'
import { base_url } from '../../config/config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import tost from 'react-hot-toast'
import storeContext from '../../context/storeContext'

const Login = () => {

  const navigate = useNavigate()
  const { dispatch } = useContext(storeContext)
  const [loder, setLoder] = useState(false)
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  console.log(state)

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value

    })
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoder(true)
      const { data } = await axios.post(`${base_url}/api/login`, state)
      console.log(data)
      setLoder(false)

      tost.success(data.message)
      dispatch({
        type: 'login_success',
        payload: {
          token: data.token
        }
      })

      if (data.token) {
        localStorage.setItem("newstoken", data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setLoder(false)
      // Fallback: If local backend is unreachable, attempt login against live API
      if (!error.response && base_url !== 'https://bakendtopbrefing.vercel.app') {
        try {
          setLoder(true)
          const { data } = await axios.post(`https://bakendtopbrefing.vercel.app/api/login`, state)
          setLoder(false)
          tost.success(data.message)
          dispatch({
            type: 'login_success',
            payload: {
              token: data.token
            }
          })
          if (data.token) {
            localStorage.setItem("newstoken", data.token);
            navigate("/dashboard");
          }
          return;
        } catch (fallbackErr) {
          setLoder(false)
          const fbMsg = fallbackErr.response?.data?.message || fallbackErr.message || 'Login failed. Unable to connect to backend server.'
          tost.error(fbMsg)
          return;
        }
      }
      const msg = error.response?.data?.message || error.message || 'Login failed. Please check your network or backend server.'
      tost.error(msg)
    }
  }

  return (
    <div className='h-screen bg-slate-200 flex justify-center items-center'>
      <div className='w-[340px] text-slate-600 shadow-md'>
        <div className='bg-white h-full px-7 py-8 rounded-md'>
          <div className='w-full justify-center items-center flex'>
            <div className='h-[70px] flex justify-center items-center'>
              <div className="flex justify-center items-center ">
                <img src="/logo.png" alt="bgimage" className='w-36 h-28 bg-contain' />
              </div>

            </div>
          </div>

          <form onSubmit={submit}>
            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='email'>Email</label>
              <input onChange={inputHandle} value={state.email} required type='text' placeholder='email' name='email' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='email' />
            </div>

            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='password'>Password</label>
              <input onChange={inputHandle} value={state.password} required name='password' id='password' type='password' placeholder='password' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' />

            </div>

            <div className='mt-2'>
              <button disabled={loder} className='px-3 py-[6px] w-full bg-purple-500 rounded-md text-white hover:bg-purple-600' to='/dashboard/writers'>{loder ? "loding.." : "Login"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login