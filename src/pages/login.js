import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import SignInForm from '../components/sign-in/SignInForm';
import PageFooter from '../components/PageFooter/PageFooter';
//import './login.css';

const LoginPage = () => {
  return (
    <div>
      <PageHeader pageName="Account" />
      <SignInForm />
      <PageFooter />
    </div>
  );
};

export default LoginPage;
