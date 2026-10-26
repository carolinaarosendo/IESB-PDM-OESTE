import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable, Alert, StyleSheet } from 'react-native';
import useNotices from '../../hooks/useNotices';
import { create } from '../../services/api';
import FadeIn from '../../components/FadeIn';

export default function Mural() {
  const { notices, isLoading, error, reload } = useNotices();
  const [ultimoIdCriado, setUltimoIdCriado] = useState(null);

  async function handleCriarAviso() {
    try {
      const resultado = await create('posts', {
        title: 'Aviso de teste',
        body: 'Criado pelo CampusGo',
        userId: 1,
      });
      setUltimoIdCriado(resultado.id);
      Alert.alert('Aviso criado', `Id devolvido pela API: ${resultado.id}`);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível criar o aviso agora.');
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{error}</Text>
        <Pressable
          style={({ pressed }) => [styles.botaoTentar, pressed && styles.botaoPressionado]}
          onPress={reload}
        >
          <Text style={styles.botaoTentarTexto}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.botaoCriar, pressed && styles.botaoPressionado]}
        onPress={handleCriarAviso}
      >
        <Text style={styles.botaoCriarTexto}>Criar aviso</Text>
      </Pressable>
      {ultimoIdCriado && (
        <Text style={styles.confirmacao}>Último aviso criado — id: {ultimoIdCriado}</Text>
      )}
      <FlatList
        data={notices}
        keyExtractor={(item) => String(item.id)}
        refreshing={isLoading}
        onRefresh={reload}
        contentContainerStyle={notices.length === 0 && styles.listaVazia}
        ListEmptyComponent={<Text style={styles.textoVazio}>Nenhum aviso no momento.</Text>}
        renderItem={({ item }) => (
          <FadeIn style={styles.card}>
            <Text style={styles.cardTitulo}>{item.title}</Text>
            <Text style={styles.cardTexto}>{item.body}</Text>
          </FadeIn>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  erro: { fontSize: 15, color: '#d32f2f', textAlign: 'center', marginBottom: 16 },
  botaoTentar: { backgroundColor: '#4f46e5', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  botaoTentarTexto: { color: '#fff', fontWeight: '600' },
  botaoPressionado: { opacity: 0.7 },
  botaoCriar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4f46e5',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoCriarTexto: { color: '#4f46e5', fontWeight: '600' },
  confirmacao: { fontSize: 13, color: '#16a34a', textAlign: 'center', marginBottom: 12 },
  listaVazia: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
  textoVazio: { color: '#888' },
  card: {
    backgroundColor: '#f5f5f7',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  cardTitulo: { fontSize: 15, fontWeight: '600', marginBottom: 4, textTransform: 'capitalize' },
  cardTexto: { fontSize: 13, color: '#555' },
});