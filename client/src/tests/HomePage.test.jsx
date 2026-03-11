import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import React from 'react';

describe('HomePage', () => {
  it('renders the logo and tagline', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText('HELTHEDIA')).toBeDefined();
    expect(screen.getByText('Scientific and Medical Research Search Engine')).toBeDefined();
  });

  it('renders the search bar', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Search for medical research/i)).toBeDefined();
  });
});
