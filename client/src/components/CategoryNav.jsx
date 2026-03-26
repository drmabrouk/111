import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'Cardiology', 'Oncology', 'Nutrition', 'Immunology',
  'Neurology', 'Pediatrics', 'Public Health', 'Psychiatry'
];

const CategoryNav = () => {
  return (
    <nav className="category-nav">
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/search?q=${category.toLowerCase()}`}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNav;
