import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('7. Requisito', () => {
  it('Teste se as informações do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const linkDetailEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetailEl);
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const titleDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(titleDetails).toBeInTheDocument();
    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(linkDetailEl).not.toBeInTheDocument();
    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const titleSummary = screen.getByRole('heading', { name: /Summary/i });
    expect(titleSummary).toBeInTheDocument();
    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const descriptionPokemon = screen.getByText(/This intelligent Pokémon/i);
    expect(descriptionPokemon).toBeInTheDocument();
  });

  it('Teste se as informações do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const linkDetailEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetailEl);
    // Na seção de detalhes deverá existir um heading h2 com o texto "Game Locations of <name>"
    const titleLocation = screen.getByRole(
      'heading', { name: /Game Locations of Pikachu/i },
    );
    expect(titleLocation).toBeInTheDocument();
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const imgFavoriteEl = screen.getAllByAltText('Pikachu location');
    expect(imgFavoriteEl).toHaveLength(2);
    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    const locationEl = screen.getAllByText(/Kanto/i);
    expect(locationEl).toHaveLength(2);
    // A imagem da localização deve ter um atributo src com a URL da localização;
    expect(imgFavoriteEl[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgFavoriteEl[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    // A imagem da localização deve ter um atributo alt com o texto "<name> location", onde <name> é o nome do Pokémon;
    imgFavoriteEl.forEach((item) => expect(item.alt).toContain('Pikachu location'));
  });

  it('Teste se o usuário pode favoritar um pokémon.', () => {
    renderWithRouter(<App />);
    const linkDetailEl = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetailEl);
    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(favoriteCheckbox);
    const imgFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgFavorite).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(imgFavorite).not.toBeInTheDocument();
    screen.logTestingPlaygroundURL();
    // O label do checkbox deve conter o texto Pokémon favoritado?;
    const favoriteLabel = screen.getByLabelText(/Pokémon favoritado/i);
    expect(favoriteLabel).toBeInTheDocument();
  });
});
