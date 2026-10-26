import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export async function pickImage() {
  const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissao.granted) {
    Alert.alert('Permissão necessária', 'Precisamos acessar sua galeria para trocar a foto.');
    return null;
  }

  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  });

  if (resultado.canceled) return null;
  return resultado.assets[0].uri;
}

export async function takePhoto() {
  const permissao = await ImagePicker.requestCameraPermissionsAsync();
  if (!permissao.granted) {
    Alert.alert(
      'Permissão da câmera negada',
      'Para tirar uma foto, permita o acesso à câmera nos ajustes do dispositivo.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );
    return null;
  }

  const resultado = await ImagePicker.launchCameraAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  });

  if (resultado.canceled) return null;
  return resultado.assets[0].uri;
}

export default { pickImage, takePhoto };