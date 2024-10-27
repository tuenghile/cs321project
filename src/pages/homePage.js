import './css/homePage.css';
import PageHeader from '../components/page-header/PageHeader';
import RecentPosts from '../components/recent-posts-section/RecentPosts';
import ContactSection from '../components/contact-section/ContactSection';
import PrimaryButton from '../components/primary-button/PrimaryButton';

const HomePage = () => {
  

  return (
    <div className="home-page">

      {/* Header Section */}
      <PageHeader pageName="LOST AND FOUND" pageDescription="of George Mason University" />

      {/* Recent Posts Section */}
      <RecentPosts />

      {/* Contact Section */}
      <ContactSection />

    </div>
  );
};

export default HomePage;
