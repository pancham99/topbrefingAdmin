import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import storeContext from '../../context/storeContext';
import { useLoginMutation } from '../../hooks/api/useAuthQueries';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(storeContext);

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      toast.success(data?.message || "Login successful");
      dispatch({
        type: 'login_success',
        payload: {
          token: data.token
        }
      });
      if (data.token) {
        localStorage.setItem("newstoken", data.token);
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message || 'Login failed. Please check your credentials or network connection.';
      toast.error(msg);
    },
  });

  const submit = (e) => {
    e.preventDefault();
    loginMutation.mutate(state);
  };

  return (
    <div className='h-screen bg-slate-200 flex justify-center items-center'>
      <div className='w-[340px] text-slate-600 shadow-md'>
        <div className='bg-white h-full px-7 py-8 rounded-md'>
          <div className='w-full justify-center items-center flex'>
            <div className='h-[70px] flex justify-center items-center'>
              <div className="flex justify-center items-center ">
                <img src="/logo.png" alt="logo" className='w-36 h-28 bg-contain' />
              </div>
            </div>
          </div>

          <form onSubmit={submit}>
            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='email'>Email</label>
              <input onChange={inputHandle} value={state.email} required type='email' placeholder='email' name='email' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='email' />
            </div>

            <div className='flex flex-col gap-y-2 mb-5'>
              <label className='text-md font-medium text-gray-600' htmlFor='password'>Password</label>
              <input onChange={inputHandle} value={state.password} required name='password' id='password' type='password' placeholder='password' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' />
            </div>

            <div className='mt-2'>
              <button disabled={loginMutation.isPending} className='px-3 py-[6px] w-full bg-purple-500 rounded-md text-white hover:bg-purple-600' type='submit'>
                {loginMutation.isPending ? "Loading.." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;