import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('1. Requisito', () => {
  it('Verifica se o primeiro link possui o texto Home ', () => {
    renderWithRouter(<App />);
    const LinkHomeEl = screen.getByRole('link', { name: /Home/i });
    expect(LinkHomeEl).toBeDefined();
  });

  it('Verifica se o segundo link possui o texto About ', () => {
    renderWithRouter(<App />);
    const LinkAboutEl = screen.getByRole('link', { name: /About/i });
    expect(LinkAboutEl).toBeDefined();
  });

  it('Verifica se o terceiro link possui o texto Favorite Pokémons ', () => {
    renderWithRouter(<App />);
    const LinkFavoriteEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(LinkFavoriteEl).toBeDefined();
  });

  it('Aplicação é redirecionada para a página inicial ao clicar no Home', () => {
    const { history } = renderWithRouter(<App />);
    const LinkHomeEl = screen.getByRole('link', { name: /Home/i });
    userEvent.click(LinkHomeEl);
    expect(history.location.pathname).toBe('/');
  });

  it('Aplicação é redirecionada para a página About ao clicar no About', () => {
    const { history } = renderWithRouter(<App />);
    const LinkAboutEl = screen.getByRole('link', { name: /About/i });
    userEvent.click(LinkAboutEl);
    expect(history.location.pathname).toBe('/about');
  });

  it('Aplicação é redirecionada para Favorite Pokémons ao clicar no Favorite', () => {
    const { history } = renderWithRouter(<App />);
    const LinkFavoriteEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(LinkFavoriteEl);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Aplicação é redirecionada para Not Found ao acessar uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const titleEl = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(titleEl).toBeDefined();
  });
});
