import React from 'react';
import AdminSettings from '../components/admin-settings-box/adminSettings';
import PageHeader from '../components/page-header/PageHeader';
import PageFooter from '../components/PageFooter/PageFooter';


const AdminSettingsPage = () => {
  return (
    <div>
      <PageHeader pageName="Account" />
      <AdminSettings />
      <PageFooter />
    </div>
  );
};

export default AdminSettingsPage;
