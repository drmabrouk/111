import React from 'react';
import ResultCard from './ResultCard';

const ResultList = ({ results, loading }) => {
  if (loading) return <div className="loading">Searching medical databases...</div>;
  if (results.length === 0) return <div className="no-results">No research papers found matching your criteria.</div>;

  return (
    <div className="result-list">
      <div className="results-count">{results.length} results found</div>
      {results.map((paper) => (
        <ResultCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
};

export default ResultList;
