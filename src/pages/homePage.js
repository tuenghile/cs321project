import './css/homePage.css';
import PageHeader from '../components/page-header/PageHeader';
import RecentPosts from '../components/recent-posts/RecentPosts';
import ContactSection from '../components/contact-section/ContactSection';

const HomePage = () => {
  

  return (
    <div className="home-page">

      {/* Header Section */}
      <PageHeader websiteName="George Mason University" pageName="LOST AND FOUND" />

      {/* Recent Posts Section */}
      <RecentPosts />

      {/* Contact Section */}
      <ContactSection />

    </div>
  );
};

export default HomePage;
