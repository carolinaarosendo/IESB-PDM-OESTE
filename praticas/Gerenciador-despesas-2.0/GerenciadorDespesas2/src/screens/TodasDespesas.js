import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet, useWindowDimensions } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { useAppTheme } from '../store/theme-context';
import { CATEGORIES } from '../constants/categories';
import useDebounce from '../hooks/useDebounce';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function TodasDespesas({ navigation }) {
  const { expenses, clearExpenses } = useExpenses();
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();

  const [busca, setBusca] = useState('');
  const buscaComAtraso = useDebounce(busca, 400);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasFiltradas = useMemo(() => {
    return expenses.filter((item) => {
      const combinaCategoria =
        categoriaSelecionada === 'Todas' || item.category === categoriaSelecionada;
      const combinaBusca = item.description
        .toLowerCase()
        .includes(buscaComAtraso.trim().toLowerCase());
      return combinaCategoria && combinaBusca;
    });
  }, [expenses, buscaComAtraso, categoriaSelecionada]);

  function handleSelecionar(id) {
    navigation.navigate('GerenciarDespesa', { expenseId: id });
  }

  function handleLimparTudo() {
    Alert.alert('Limpar tudo', 'Tem certeza que deseja remover todas as despesas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  const opcoesCategoria = ['Todas', ...CATEGORIES];
  const numColumns = width > 600 ? 2 : 1;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[styles.busca, { borderColor: theme.border, color: theme.text }]}
        placeholder="Buscar por descrição..."
        placeholderTextColor={theme.textMuted}
        value={busca}
        onChangeText={setBusca}
      />

      <View style={styles.filtros}>
        {opcoesCategoria.map((categoria) => (
          <Pressable
            key={categoria}
            onPress={() => setCategoriaSelecionada(categoria)}
            style={({ pressed }) => [
              styles.filtroBotao,
              { borderColor: theme.primary },
              categoriaSelecionada === categoria && { backgroundColor: theme.primary },
              pressed && styles.filtroBotaoPressionado,
            ]}
          >
            <Text
              style={[
                styles.filtroTexto,
                { color: categoriaSelecionada === categoria ? '#fff' : theme.primary },
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
        <Pressable onPress={handleLimparTudo} style={styles.botaoLimpar}>
          <Text style={[styles.filtroTexto, { color: theme.danger }]}>Limpar tudo</Text>
        </Pressable>
      </View>

      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={categoriaSelecionada}
        onSelecionar={handleSelecionar}
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  busca: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12 },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 },
  filtroBotao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  filtroBotaoPressionado: { opacity: 0.6 },
  filtroTexto: { fontSize: 13 },
  botaoLimpar: { paddingHorizontal: 8, paddingVertical: 6, marginBottom: 8 },
});