# NAVEDEX

## Descrição

Desafio Navedex:
Criar um aplicativo para visualização e criação dos navers, possuindo informações como: nome, idade, cargo, tempo de empresa e projetos que participou.
As telas utilizadas como guia foram as que estão disponiveis no [figma](https://www.figma.com/file/MIh7DeADz8M3mmcQwpcFdD/Teste-Mobile?node-id=1253%3A0)
Foi feito a integração com a api da navedex desenvolvida pela nave.rs disponivel na uri: https://navedex-api.herokuapp.com/v1/. A documentação da API está disponivel em [collection](https://www.getpostman.com/collections/e6afe4028c2a1e56e577), é preciso utilizar o postman para importa-la.

Para mais informações sobre os requisitos do projeto, acesse [repositório oficial do desáfio](https://github.com/naveteam/react-native-challenge)

## Como rodar o projeto

### Requisitos

- Clonar o repositório.
- Instalar [node.js](https://nodejs.org/en/).
- Já ter feito o [setup de environment](https://reactnative.dev/docs/environment-setup).
- Rodar o comando `yarn install` ou `npx install` para instalar as dependências do projeto.

### Rodando no android

Após cumprir todas etapas iniciais, basta apenas:

- Rodar o comando `yarn start` para subir o servidor de desenvolvimento.
- Rodar o comando `yarn android` para fazer o build do app para o emulador.

## Directory Structure

```
|── /__tests__
|
├── /src
|   ├── /assets
|   ├── /components
|   ├── /constants
|   ├── /contexts
|   ├── /navigators
|   ├── /providers
|   ├── /screens
|   ├── /services
|   ├── /theme
|   ├── /utils
```
