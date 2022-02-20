import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('5. Requisito', () => {
  const pokemonName = 'pokemon-name';
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const titlePokedexEl = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(titlePokedexEl).toBeDefined();
  });

  it('Teste se é exibido o próximo Pokémon quando o botão é clicado.', () => {
    const pokemonsName = [
      'Charmander', 'Caterpie', 'Ekans', 'Alakazam',
      'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
    const buttonEl = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonEl).toBeDefined();

    const namePokemonEl = screen.getByText(/Pikachu/i);
    expect(namePokemonEl).toBeDefined();

    pokemonsName.forEach((pokemon) => {
      userEvent.click(buttonEl);
      const namePokeEl = screen.getByText(pokemon);
      expect(namePokeEl).toBeDefined();
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const namePokemonEl = screen.getAllByTestId(pokemonName);
    expect(namePokemonEl).toHaveLength(1);
  });

  it('Teste os botões de filtro da Pokédex.', () => {
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const NUMBER_TYPES = 7;
    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    expect(filterBtn).toHaveLength(NUMBER_TYPES);
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const pokemonsFire = ['Charmander', 'Rapidash'];
    pokemonsFire.forEach((pokemon, index) => {
      let button;
      if (index === 0) {
        button = screen.getByRole('button', { name: 'Fire' });
      } else { button = screen.getByRole('button', { name: 'Próximo pokémon' }); }
      userEvent.click(button);
      const namePokemonEl = screen.getByTestId(pokemonName);
      expect(namePokemonEl).toHaveTextContent(pokemon);
    });
    // O botão All precisa estar sempre visível.
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeDefined();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeDefined();
    userEvent.click(buttonAll);
    const namePokemonEl = screen.getByTestId(pokemonName);
    expect(namePokemonEl).toHaveTextContent('Pikachu');
  });
});
