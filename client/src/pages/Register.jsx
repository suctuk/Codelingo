import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div>
      <RegisterForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default Register;