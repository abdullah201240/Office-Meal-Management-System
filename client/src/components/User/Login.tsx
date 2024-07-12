import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useLogin';
import { setAuth } from '../redux/authSlice';
import { loginUser } from '../api/authApi';
import '../../assets/css/Style.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setAuth({ token: data.token, email: data.email }));
      navigate('/home');
    },
    onError: (error: any) => {
      setErrorMessage(error.response?.data?.error || 'An error occurred');
      
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(''); 
    loginMutation.mutate({ email, password });
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
              MANUSH Tech <br />
            </h1>
            <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
              We are an analytics-focused technology offshoring firm specializing in delivering customized and scalable tech solutions for both startups and enterprise businesses. Our expertise ensures that you receive tailored, data-driven solutions designed to meet your unique business needs.
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                  </div>

                  {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                  <button type="submit" className="btn btn-primary btn-block mb-4" disabled={loginMutation.status === 'pending'}>
                    {loginMutation.status === 'pending' ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
