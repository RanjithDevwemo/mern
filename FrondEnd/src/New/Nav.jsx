// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ cartCount }) => {
//   return (
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/cart">Cart :{ cartCount }</Link></li>
//        <li> <Link to="/login">Login</Link></li>
//        <li><Link to="/register">Register</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;



// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/nav.css"
const Navbar = ({ cartCount, user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className='nav'>
      <Link to="/" className='li'>Products</Link>
      <Link to="/cart" className='li'>Cart ({cartCount})</Link>
      {user ? (
        <>
          <span>{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) :  (
        <>
        <h5>User</h5>
          <Link to="/login" className='li'>Login</Link>
          <Link to="/register" className='li'>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
