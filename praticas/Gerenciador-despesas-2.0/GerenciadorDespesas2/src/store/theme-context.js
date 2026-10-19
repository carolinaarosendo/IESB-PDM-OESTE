import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { getTheme } from '../constants/theme';

const ThemeContext = createContext(null);

export function ThemeContextProvider({ children }) {
  const colorSchemeSistema = useColorScheme();
  const [modoManual, setModoManual] = useState(null); // null = segue o sistema

  const colorScheme = modoManual ?? colorSchemeSistema;
  const theme = getTheme(colorScheme);

  function alternarTema() {
    setModoManual((atual) => {
      const baseAtual = atual ?? colorSchemeSistema;
      return baseAtual === 'dark' ? 'light' : 'dark';
    });
  }

  const value = { theme, colorScheme, alternarTema };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme precisa ser usado dentro de um ThemeContextProvider');
  }
  return context;
}