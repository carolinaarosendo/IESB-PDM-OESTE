import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIAS } from '../constants/categorias';

export default function GerenciarDespesa({ onAdicionar, navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  function handleValorChange(texto) {
    if (/^\d*\.?\d{0,2}$/.test(texto)) {
      setValor(texto);
    }
  }

  function handleMudarData(event, dataSelecionada) {
    setMostrarDatePicker(Platform.OS === 'ios'); // no iOS o seletor fica sempre visível
    if (dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function handleSalvar() {
    if (descricao.trim() === '' || valor.trim() === '' || categoria === '') {
      Alert.alert('Atenção', 'Preencha descrição, valor e categoria antes de salvar.');
      return;
    }

    const novaDespesa = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      categoria,
      data,
    };

    onAdicionar(novaDespesa);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Conta de luz"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.rotulo}>Valor</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        value={valor}
        onChangeText={handleValorChange}
        keyboardType="decimal-pad"
      />

      <Text style={styles.rotulo}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarDatePicker(true)}>
        <Text>{data.toLocaleDateString('pt-BR')}</Text>
      </Pressable>
      {mostrarDatePicker && (
        <DateTimePicker value={data} mode="date" display="default" onChange={handleMudarData} />
      )}

      <Text style={styles.rotulo}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((opcao) => (
          <Pressable
            key={opcao}
            onPress={() => setCategoria(opcao)}
            style={({ pressed }) => [
              styles.categoriaBotao,
              categoria === opcao && styles.categoriaBotaoAtiva,
              pressed && styles.categoriaBotaoPressionada,
            ]}
          >
            <Text
              style={[styles.categoriaTexto, categoria === opcao && styles.categoriaTextoAtivo]}
            >
              {opcao}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={({ pressed }) => [styles.botaoSalvar, pressed && styles.botaoSalvarPressionado]}
        onPress={handleSalvar}
      >
        <Text style={styles.botaoSalvarTexto}>Salvar despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  rotulo: {
    fontSize: 13,
    color: '#555',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoriaBotao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2e6ef7',
    marginRight: 8,
    marginTop: 8,
  },
  categoriaBotaoAtiva: {
    backgroundColor: '#2e6ef7',
  },
  categoriaBotaoPressionada: {
    opacity: 0.6,
  },
  categoriaTexto: {
    color: '#2e6ef7',
    fontSize: 13,
  },
  categoriaTextoAtivo: {
    color: '#fff',
  },
  botaoSalvar: {
    backgroundColor: '#2e6ef7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoSalvarPressionado: {
    opacity: 0.6,
  },
  botaoSalvarTexto: {
    color: '#fff',
    fontWeight: '600',
  },
});