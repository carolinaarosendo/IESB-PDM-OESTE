# Prática 05 — Metas do Semestre

App de cadastro de metas de estudo com persistência local via AsyncStorage.

## Comando usado para criar o projeto

    npx create-expo-app@latest MetasSemestre --template blank

## Como rodar

    npm install
    npx expo start --web

## Onde está a lógica de persistência

- `App.js`, useEffect de carga (linha ~14): lê o AsyncStorage na chave
  `@metas_semestre` assim que o app monta e preenche o estado `metas`.
- `App.js`, useEffect de salvamento (linha ~29): roda toda vez que `metas`
  muda e grava o array inteiro no AsyncStorage com `JSON.stringify`.

## Prints

![lista vazia](./MetasSemestre/Prints/Print%201.png)
![lista com itens](./MetasSemestre/Prints/Print%202.png)
![apos reabrir](./MetasSemestre/Prints/Print%203.png)