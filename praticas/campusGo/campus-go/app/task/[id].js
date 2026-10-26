import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tarefa número {id}</Text>
      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        onPress={() => router.back()}
      >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 24 },
  botao: { backgroundColor: '#4f46e5', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  botaoPressionado: { opacity: 0.7 },
  botaoTexto: { color: '#fff', fontWeight: '600' },
});