import './css/homePage.css';
import PageHeader from '../components/page-header/PageHeader';
import RecentPostsSection from '../components/recent-posts-section/RecentPostsSection';
import ContactSection from '../components/contact-section/ContactSection';

const HomePage = () => {
  

  return (
    <div className="home-page">

      {/* Header Section */}
      <PageHeader pageName="LOST AND FOUND" pageDescription="of George Mason University" />

      {/* Recent Posts Section */}
      <RecentPostsSection />
      {/* <PostCard /> */}
      {/* Contact Section */}
      <ContactSection />

    </div>
  );
};

export default HomePage;
