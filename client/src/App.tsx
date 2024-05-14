import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Categories from './component/Categories';

const About = () => <h1>About</h1>;
const Contact = () => <h1>Contact</h1>;

const App: React.FC = () => {
  let [location, setLocation] = useState(String)

  console.log(location)

  return (
    <Router>
      <div style={{ marginLeft: '20%', marginRight: "20%" }}>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <h2
              className={`nav-link ${location === '/' ? 'active' : ''}`}
              onClick={() => setLocation('/')} >
              <Link to='/'>Categories</Link>
            </h2>
          </li>
          <li className="nav-item ">
            <h2
              className={`nav-link ${location === '/products' ? 'active' : ''}`}
              onClick={() => setLocation('/products')}
            >
              <Link to='/products'>Prducts</Link>
            </h2>
          </li>
          <li className="nav-item">
            <h2
              className={`nav-link ${location === '/productInfo' ? 'active' : ''}`}
              onClick={() => setLocation('/productInfo')} >
              <Link to='/productInfo'>Product Info</Link>
            </h2>
          </li>
        </ul>


        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/products" element={<About />} />
          <Route path="/productInfo" element={<Contact />} />
        </Routes>
      </div>
    </Router >
  );
};

export default App;
