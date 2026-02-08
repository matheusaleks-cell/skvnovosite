import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/comunicacao-visual" element={<Category />} />
          <Route path="/confeccao" element={<Category />} />
          <Route path="/campanhas-politicas" element={<Category />} />
          <Route path="/brindes" element={<Category />} />
          <Route path="/produtos" element={<Category />} />
          <Route path="/produto/:slug" element={<ProductDetail />} />
        </Routes>
        <WhatsAppButton />
      </Layout>
    </Router>
  );
}

export default App;
