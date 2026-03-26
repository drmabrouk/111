import React from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const years = ['2025', '2024', '2023', '2022', '2021', 'Older'];
  const journals = ['NEJM', 'The Lancet', 'JAMA', 'Nature Medicine', 'Science'];

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      <div className="filter-group">
        <h4>Year</h4>
        {years.map(year => (
          <label key={year}>
            <input
              type="checkbox"
              checked={filters.years?.includes(year)}
              onChange={() => onFilterChange('years', year)}
            /> {year}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Journal</h4>
        {journals.map(journal => (
          <label key={journal}>
            <input
              type="checkbox"
              checked={filters.journals?.includes(journal)}
              onChange={() => onFilterChange('journals', journal)}
            /> {journal}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Access</h4>
        <label>
          <input
            type="checkbox"
            checked={filters.openAccess}
            onChange={() => onFilterChange('openAccess', !filters.openAccess)}
          /> Open Access
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
