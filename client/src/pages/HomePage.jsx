import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryNav from '../components/CategoryNav';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="home-page">
      <header>
        <h1 className="logo">HELTHEDIA</h1>
        <p className="tagline">Scientific and Medical Research Search Engine</p>
      </header>

      <main>
        <section className="hero">
          <SearchBar onSearch={handleSearch} />
          <CategoryNav />
        </section>

        <section className="trending">
          <h2>Trending Topics</h2>
          <div className="trending-grid">
            <div className="trending-item">COVID-19 Vaccination Trends</div>
            <div className="trending-item">Advances in CRISPR Technology</div>
            <div className="trending-item">Gut Microbiome and Mental Health</div>
            <div className="trending-item">AI in Medical Imaging</div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Helthedia. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
