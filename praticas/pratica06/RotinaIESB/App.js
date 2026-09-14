import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import * as labels from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível carregar seus compromissos salvos.');
      } finally {
        setCarregando(false);
      }
    }
    carregarCompromissos();
  }, []);

  useEffect(() => {
    if (carregando) return;
    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível salvar seus compromissos.');
      }
    }
    salvarCompromissos();
  }, [compromissos, carregando]);

  const handleAdd = () => {
    if (texto.trim() === '') {
      Alert.alert('Atenção', 'Digite um compromisso antes de adicionar.');
      return;
    }
    const novoCompromisso = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toISOString(),
      concluido: false,
    };
    setCompromissos((atuais) => [...atuais, novoCompromisso]);
    setTexto('');
  };

  const handleDelete = (id) => {
    setCompromissos((atuais) => atuais.filter((compromisso) => compromisso.id !== id));
  };

  const handleToggle = (id) => {
    setCompromissos((atuais) =>
      atuais.map((compromisso) =>
        compromisso.id === id ? { ...compromisso, concluido: !compromisso.concluido } : compromisso
      )
    );
  };

  const pendentes = compromissos.filter((c) => !c.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Cabeçalho: Image + título, em linha */}
          <View style={styles.header}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <View>
              <Text style={styles.titulo}>{labels.tituloApp}</Text>
              <Text style={styles.contador}>{pendentes} pendentes</Text>
            </View>
          </View>

          {/* Formulário de cadastro */}
          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={handleAdd}
            labels={labels}
          />

          {/* Lista, ocupando o restante da tela */}
          <CompromissoList
            itens={compromissos}
            onDelete={handleDelete}
            onToggle={handleToggle}
            tituloLista={labels.tituloLista}
            listaVazia={labels.listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contador: {
    fontSize: 12,
    color: '#666',
  },
});