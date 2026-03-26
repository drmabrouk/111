import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import ResultList from '../components/ResultList';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    years: [],
    journals: [],
    openAccess: false
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query, filters]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    try {
      // Build query params including filters
      const params = new URLSearchParams();
      params.append('q', searchQuery);
      if (filters.years.length > 0) params.append('years', filters.years.join(','));
      if (filters.journals.length > 0) params.append('journals', filters.journals.join(','));
      if (filters.openAccess) params.append('openAccess', 'true');

      const response = await fetch(`http://localhost:5000/api/search?${params.toString()}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      // Fallback/Mock for design purposes if API is down
      setResults([
        {
          id: 1,
          title: "Long-term Outcomes of mRNA Vaccines in Oncology Patients",
          authors: ["Smith J.", "Doe A.", "Wilson K."],
          journal: "Nature Medicine",
          year: "2024",
          abstract: "This study investigates the efficacy and safety of mRNA-based therapeutic vaccines in patients undergoing treatment for solid tumors over a 24-month period..."
        },
        {
          id: 2,
          title: "Artificial Intelligence in Early Detection of Pancreatic Cancer",
          authors: ["Lee S.", "Chen H."],
          journal: "The Lancet Digital Health",
          year: "2023",
          abstract: "We developed a deep learning algorithm trained on 50,000 CT scans to identify early-stage pancreatic lesions that are often missed by human radiologists..."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === 'openAccess') return { ...prev, [type]: value };

      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];

      return { ...prev, [type]: updated };
    });
  };

  return (
    <div className="search-results-page">
      <header className="results-header">
        <Link to="/" className="logo-small-link">
          <h1 className="logo-small">HELTHEDIA</h1>
        </Link>
        <SearchBar onSearch={(q) => navigate(`/search?q=${q}`)} />
      </header>

      <div className="results-container">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        <ResultList results={results} loading={loading} />
      </div>
    </div>
  );
};

export default SearchResultsPage;
