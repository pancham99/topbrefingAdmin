import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import { useNavigate } from 'react-router-dom'

const AddWriter = () => {
  const navigate = useNavigate()
  const { store } = useContext(storeContext)

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    category: '',
  })

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const [loader, setLoader] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      const { data } = await axios.post(`${base_url}/api/news/writer/add`, state, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      })

      setLoader(false)
      toast.success(data.message)
      navigate('/dashboard/writers')

    } catch (error) {
      setLoader(false)
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <div className='bg-white rounded-md'>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl font-medium'>Add Writers</h2>
        <Link className='px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600' to='/dashboard/writers'>Writers</Link>
      </div>

      <div className='p-4'>

        <form onSubmit={submit}>
          <div className='grid lg:grid-cols-2 gap-x-8 mb-3'>
            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='name'>Name</label>
              <input onChange={inputHandler} value={state.name} required type='text' placeholder='name' name='name' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='name' />
            </div>

            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='category'>Category</label>
              <select onChange={inputHandler} value={state.category} required name='category' id='category' type='text' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'>
                <option value="">---select category--</option>
                <option value="शिक्षा">शिक्षा</option>
                <option value="राजनीति ">राजनीति </option>
                <option value="स्वास्थ्य">स्वास्थ्य</option>
                <option value="अंतरराष्ट्रीय">अंतरराष्ट्रीय</option>
                <option value="खेल">खेल</option>
                <option value="प्रौद्योगिकी">प्रौद्योगिकी</option>
                <option value="यात्रा">यात्रा</option>
                <option value="मनोरंजन">मनोरंजन</option>
                <option value="भक्ति">भक्ति</option>
                <option value="लाइफस्टाइल">लाइफस्टाइल</option>
                <option value="अपराध">अपराध</option>

                
              </select>
            </div>


            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='email'>Email</label>
              <input onChange={inputHandler} value={state.email} required type='text' placeholder='email' name='email' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='name' />
            </div>

            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='password'>Password</label>
              <input onChange={inputHandler} value={state.password} name='password' id='password' type='password' placeholder='password' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' />

            </div>
          </div>
          <div className='mt-2'>
            <button disabled={loader} className='px-3 py-[6px] bg-purple-500 rounded-md text-white hover:bg-purple-600' to='/dashboard/writers'>{loader ? "Loading.." : "Add Writers"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddWriter