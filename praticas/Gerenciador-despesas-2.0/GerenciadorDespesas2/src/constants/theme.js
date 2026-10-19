export const lightTheme = {
  background: '#f5f6fa',
  card: '#ffffff',
  text: '#1c1c1c',
  textMuted: '#666666',
  primary: '#2e6ef7',
  border: '#d0d0d0',
  danger: '#d32f2f',
};

export const darkTheme = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#f2f2f2',
  textMuted: '#aaaaaa',
  primary: '#5b8dff',
  border: '#3a3a3a',
  danger: '#ff6b6b',
};

export function getTheme(colorScheme) {
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}