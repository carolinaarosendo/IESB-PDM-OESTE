import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const permissao = await Location.requestForegroundPermissionsAsync();
  if (!permissao.granted) {
    return null;
  }

  try {
    const posicao = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = posicao.coords;

    const enderecos = await Location.reverseGeocodeAsync({ latitude, longitude });
    const endereco = enderecos[0];

    const label = endereco
      ? [endereco.street, endereco.city, endereco.region].filter(Boolean).join(', ')
      : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

    return { label, latitude, longitude };
  } catch (erro) {
    return null;
  }
}

export default { getCurrentPlace };