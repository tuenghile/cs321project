import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import ContactSection from '../components/contact-section/ContactSection';
import SignUpForm from '../components/sign-up/SignUpForm';
//import './login.css';

const CreateAccount = () => {
  return (
    <div>
      <PageHeader pageName="Create Account" />
      <SignUpForm />
      <ContactSection />
    </div>
  );
};

export default CreateAccount;