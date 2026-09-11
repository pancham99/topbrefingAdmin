import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import storeContext from '../../context/storeContext';
import { useLoginMutation } from '../../hooks/api/useAuthQueries';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiArrowRight } from 'react-icons/fi';
import { BiLoaderAlt } from 'react-icons/bi';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(storeContext);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className='min-h-screen w-full bg-slate-950 text-slate-100 flex justify-center items-center p-4 relative overflow-hidden selection:bg-red-500 selection:text-white'>
      {/* Dynamic Background Effects */}
      <div className='absolute top-0 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none' />

      {/* Main Glass Card Container */}
      <div className='w-full max-w-md relative z-10'>
        {/* Card outer glow */}
        <div className='absolute -inset-0.5 bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000' />

        <div className='bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden'>
          {/* Top accent bar */}
          <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500' />

          {/* Logo & Header */}
          <div className='flex flex-col items-center mb-8 text-center'>
            <div className='relative group mb-2'>
              {/* Soft glow ring behind logo badge */}
              <div className='absolute -inset-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-2xl blur-md opacity-40 group-hover:opacity-70 transition duration-500' />

              {/* Crisp white badge container for clear logo display */}
              <div className='relative px-2 py-2 bg-white rounded-2xl border border-white/50 shadow-xl flex justify-center items-center'>
                <img src="/topbrefing-mobile.png" alt="Top Briefing" className='h-32 w-auto max-w-full object-contain drop-shadow-sm' />
              </div>
            </div>

            <h1 className='text-2xl font-bold tracking-tight text-white'>
              Admin Portal
            </h1>
            <p className='text-xs text-slate-400 mt-1.5 font-medium'>
              Enter your credentials to manage Top Briefing
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className='space-y-5'>
            {/* Email Field */}
            <div className='space-y-1.5 group'>
              <label className='text-xs font-semibold uppercase tracking-wider text-slate-300' htmlFor='email'>
                Email Address
              </label>
              <div className='relative flex items-center'>
                <div className='absolute left-3.5 text-slate-400 group-focus-within:text-red-500 transition-colors duration-200 pointer-events-none'>
                  <FiMail className='text-lg' />
                </div>
                <input
                  onChange={inputHandle}
                  value={state.email}
                  required
                  type='email'
                  placeholder='admin@topbriefing.com'
                  name='email'
                  id='email'
                  className='w-full bg-slate-800/60 border border-slate-700/70 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl pl-11 pr-4 py-3 text-sm font-medium transition-all duration-200'
                />
              </div>
            </div>

            {/* Password Field */}
            <div className='space-y-1.5 group'>
              <div className='flex justify-between items-center'>
                <label className='text-xs font-semibold uppercase tracking-wider text-slate-300' htmlFor='password'>
                  Password
                </label>
              </div>
              <div className='relative flex items-center'>
                <div className='absolute left-3.5 text-slate-400 group-focus-within:text-red-500 transition-colors duration-200 pointer-events-none'>
                  <FiLock className='text-lg' />
                </div>
                <input
                  onChange={inputHandle}
                  value={state.password}
                  required
                  name='password'
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  className='w-full bg-slate-800/60 border border-slate-700/70 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl pl-11 pr-11 py-3 text-sm font-medium transition-all duration-200'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3.5 text-slate-400 hover:text-slate-200 focus:outline-none transition-colors duration-200'
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className='text-lg' /> : <FiEye className='text-lg' />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className='pt-2'>
              <button
                disabled={loginMutation.isPending}
                type='submit'
                className='group w-full py-3.5 px-4 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {loginMutation.isPending ? (
                  <>
                    <BiLoaderAlt className='animate-spin text-xl' />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Login to Dashboard</span>
                    <FiArrowRight className='text-lg transition-transform duration-200 group-hover:translate-x-1' />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer badge */}
          <div className='mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium'>
            <FiShield className='text-red-500 text-sm' />
            <span>Top Briefing Authorized Control Panel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;