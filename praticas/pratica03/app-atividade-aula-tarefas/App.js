
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta } from './mensagem';
import { rotulo_input_meta } from './mensagem';
import MetaList from './components/MetaList';
import { useState } from 'react';
import MetaInput from './components/MetaInput';

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    setMetas([...MetaList, inputMeta]);       
  }     

  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionarMetaHandler} />
      <View style={styles.metaContainer}>
        <MetaList array={metas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: 'column'
  },


  metaContainer: {
    flex: 10
  }

});