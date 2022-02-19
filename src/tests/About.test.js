import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('2. Requisito', () => {
  beforeEach(() => {
    render(<About />);
  });
  it('Verifica se a página contém um h2 com o texto "About Pokédex"', () => {
    const titleAboutEl = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(titleAboutEl).toBeDefined();
  });

  it('Verifica se a página contém dois parágrafos.', () => {
    const paragraphAboutEl = screen.getAllByText(/Pokémons/i);
    expect(paragraphAboutEl).toHaveLength(2);
  });

  it('Verifica se a página contém uma imagem de uma Pokédex.', () => {
    const imageAboutEl = screen.getByAltText(/Pokédex/i);
    expect(imageAboutEl.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
