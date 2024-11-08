import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import PageFooter from '../components/PageFooter/PageFooter';
import SignUpForm from '../components/sign-up/SignUpForm';
//import './login.css';

const CreateAccount = () => {
  return (
    <div>
      <PageHeader pageName="Create Account" />
      <SignUpForm />
      <PageFooter />
    </div>
  );
};

export default CreateAccount;