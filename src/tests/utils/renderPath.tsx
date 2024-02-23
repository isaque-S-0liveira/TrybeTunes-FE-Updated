import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../../App';

const renderPath = (path: string) => {
  return render(
    <MemoryRouter initialEntries={ [path] }>
      <App />
    </MemoryRouter>,
  );
};

export default renderPath;
