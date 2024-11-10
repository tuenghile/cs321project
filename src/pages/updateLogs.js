
// src/pages/updateLogs.js
import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import PageFooter from '../components/PageFooter/PageFooter';
import UpdateLogsForm from '../components/update-logs-form/UpdateLogsForm';
import './css/updateLogs.css';

const UpdateLogs = ({ addPost }) => {
  return (
    <div>
      <PageHeader pageName="Update Logs" />
      <div className='form-container'>
        <UpdateLogsForm addPost={addPost} />
      </div>
      <PageFooter />
    </div>
  );
};

export default UpdateLogs;
