import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('3. Requisito', () => {
  it('Exibe "No favorite pokemon found", se não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);
    const noFavoriteEl = screen.getByText('No favorite pokemon found');
    expect(noFavoriteEl).toBeDefined();
  });

  it('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetailEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetailEl);
    const favoriteCheckboxEl = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoriteCheckboxEl);
    history.push('/favorites');
    const namePokemonEl = screen.getByTestId('pokemon-name');
    expect(namePokemonEl).toBeDefined();
  });
});
