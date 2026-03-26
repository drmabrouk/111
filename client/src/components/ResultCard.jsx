import React from 'react';

const ResultCard = ({ paper }) => {
  return (
    <div className="result-card">
      <h3 className="paper-title">{paper.title}</h3>
      <p className="paper-meta">
        <span className="paper-authors">{paper.authors.join(', ')}</span> •
        <span className="paper-journal"> {paper.journal}</span> •
        <span className="paper-year"> {paper.year}</span>
      </p>
      <p className="paper-abstract">{paper.abstract.substring(0, 250)}...</p>
      <div className="paper-actions">
        <button className="btn-secondary">View Abstract</button>
        <button className="btn-primary">Full Text (DOI)</button>
      </div>
    </div>
  );
};

export default ResultCard;
