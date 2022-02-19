import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('4. Requisito', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/desconhecido');
  });
  test('Teste se página contém o texto "Page requested not found"', () => {
    const titleEl = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(titleEl).toBeDefined();
  });

  test('Teste se página mostra a imagem', () => {
    const imageEl = screen.getByAltText(/Pikachu/i);
    expect(imageEl.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
