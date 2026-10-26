import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const STORAGE_KEY = '@profile-photo';

export default function Profile() {
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    async function carregarFoto() {
      try {
        const uriSalva = await AsyncStorage.getItem(STORAGE_KEY);
        if (uriSalva) setFoto(uriSalva);
      } catch (erro) {
        console.log('Erro ao carregar foto:', erro);
      }
    }
    carregarFoto();
  }, []);

  async function salvarFoto(uri) {
    setFoto(uri);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, uri);
    } catch (erro) {
      console.log('Erro ao salvar foto:', erro);
    }
  }

  async function handleEscolherDaGaleria() {
    const uri = await pickImage();
    if (uri) salvarFoto(uri);
  }

  async function handleTirarFoto() {
    const uri = await takePhoto();
    if (uri) salvarFoto(uri);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handleEscolherDaGaleria}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarVazio]}>
            <Ionicons name="person" size={64} color="#999" />
          </View>
        )}
      </Pressable>
      <Text style={styles.dica}>Toque na foto para escolher na galeria</Text>

      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        onPress={handleTirarFoto}
      >
        <Ionicons name="camera-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.botaoTexto}>Tirar foto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  avatar: { width: 140, height: 140, borderRadius: 70, marginBottom: 12, backgroundColor: '#eee' },
  avatarVazio: { alignItems: 'center', justifyContent: 'center' },
  dica: { fontSize: 13, color: '#888', marginBottom: 24 },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botaoPressionado: { opacity: 0.7 },
  botaoTexto: { color: '#fff', fontWeight: '600' },
});