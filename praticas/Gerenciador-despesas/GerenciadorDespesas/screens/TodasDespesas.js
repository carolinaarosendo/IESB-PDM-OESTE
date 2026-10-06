import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { CATEGORIAS } from '../constants/categorias';

export default function TodasDespesas({ despesas }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasFiltradas =
    categoriaSelecionada === 'Todas'
      ? despesas
      : despesas.filter((item) => item.categoria === categoriaSelecionada);

  const opcoes = ['Todas', ...CATEGORIAS];

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        {opcoes.map((categoria) => (
          <Pressable
            key={categoria}
            onPress={() => setCategoriaSelecionada(categoria)}
            style={({ pressed }) => [
              styles.filtroBotao,
              categoriaSelecionada === categoria && styles.filtroBotaoAtivo,
              pressed && styles.filtroBotaoPressionado,
            ]}
          >
            <Text
              style={[
                styles.filtroTexto,
                categoriaSelecionada === categoria && styles.filtroTextoAtivo,
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
      </View>

      <DespesaSaida despesas={despesasFiltradas} periodo={categoriaSelecionada} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  filtroBotao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2e6ef7',
    marginRight: 8,
    marginBottom: 8,
  },
  filtroBotaoAtivo: {
    backgroundColor: '#2e6ef7',
  },
  filtroBotaoPressionado: {
    opacity: 0.6,
  },
  filtroTexto: {
    color: '#2e6ef7',
    fontSize: 13,
  },
  filtroTextoAtivo: {
    color: '#fff',
  },
});