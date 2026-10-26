import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NewTask() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova tarefa</Text>
      <Text style={styles.texto}>Esta é a tela de modal para criar uma nova tarefa.</Text>
      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        onPress={() => router.back()}
      >
        <Text style={styles.botaoTexto}>Fechar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  texto: { fontSize: 14, color: '#555', marginBottom: 24, textAlign: 'center' },
  botao: { backgroundColor: '#4f46e5', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  botaoPressionado: { opacity: 0.7 },
  botaoTexto: { color: '#fff', fontWeight: '600' },
});