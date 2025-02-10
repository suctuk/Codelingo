import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div>
      <LoginForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
