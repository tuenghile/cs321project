
import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import PageFooter from '../components/PageFooter/PageFooter';
import UpdateLogsForm from '../components/update-logs-form/UpdateLogsForm';
import './css/updateLogs.css';

const UpdateLogs = () => {
  return (
    <div>
      <PageHeader pageName="Update Logs" />
      <div className='form-container'>
        <UpdateLogsForm/>
      </div>
      <PageFooter />
    </div>
  );
};

export default UpdateLogs;
