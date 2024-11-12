import React from 'react';
import SettingsBox from '../components/settings/settingsBox';
import PageHeader from '../components/page-header/PageHeader';
import PageFooter from '../components/PageFooter/PageFooter';


const SettingsPage = () => {
  return (
    <div>
      <PageHeader pageName="Account" />
      <SettingsBox />
      <PageFooter />
    </div>
  );
};

export default SettingsPage;
