import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('6. Requisito', () => {
  it('Teste se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<App />);
    // O nome correto do Pokémon deve ser mostrado na tela;
    const namePokemonEl = screen.getByTestId('pokemon-name');
    expect(namePokemonEl).toHaveTextContent(/Pikachu/i);
    // O tipo correto do pokémon deve ser mostrado na tela.
    const typePokemonEl = screen.getByTestId('pokemon-type');
    expect(typePokemonEl).toHaveTextContent(/Electric/i);
    // O peso médio do pokémon deve ser exibido
    const weightPokemonEl = screen.getByTestId('pokemon-weight');
    expect(weightPokemonEl).toHaveTextContent(/Average weight: 6.0 kg/i);
    // A imagem do Pokémon deve ser exibida.
    const imgPokemonEl = screen.getByAltText(/Pikachu sprite/i);
    expect(imgPokemonEl.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon contém um link para exibir detalhes.', () => {
    renderWithRouter(<App />);
    const linkDetailEl = screen.getByRole('link', { name: /More details/i });
    expect(linkDetailEl.href).toContain('/pokemons/25');
  });

  it('Teste se ao clicar no link, é redirecionado para a página de detalhes ', () => {
    renderWithRouter(<App />);
    const linkDetailEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetailEl);
    const titleDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(titleDetails).toBeDefined();
  });

  it('Teste se a URL muda para /pokemon/<id>, onde <id> é o id do Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetailEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetailEl);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkDetailEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetailEl);
    const inputFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(inputFavorite);
    const imgFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgFavorite.src).toContain('/star-icon.svg');
    expect(imgFavorite).toBeDefined();
  });
});
