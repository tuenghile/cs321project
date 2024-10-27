import { Link } from 'react-router-dom';

function NavigationBar() {
    return(
        <nav className="navbar">
            <div className="navbar-brand">
            <Link to="/" className="brand-logo">
                Lost & Found
            </Link>
            </div>
            <ul className="navbar-list">
            <li className="navbar-item">
                <Link to="/">Home</Link>
            </li>
            <li className="navbar-item">
                <Link to="/forum">View Posts</Link>
            </li>
            <li className="navbar-item">
                <Link to="/logs">Check Logs</Link> 
            </li>
            </ul>

            {/* Search Bar */}
            <div className="navbar-search">
            <input
                type="text"
                placeholder="Search with keywords"
                className="search-input"
            />
            <button className="search-button">Search</button>
            </div>
      </nav>
    );
}

export default NavigationBar