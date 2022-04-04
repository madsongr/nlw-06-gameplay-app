# Gameplay App

Rocketseat Next Level Week 6

## Sobre o projeto / About the project
Este aplicativo foi desenvolvido para agendar partidas entre amigos e grupos que mantém a paixão
por games em comum.

This application was developed to schedule matches between friends and groups that keep the passion for games in common.


![image](https://user-images.githubusercontent.com/4735867/161635749-d7b4b33f-aa22-4277-9d98-9ac2491eb49f.png)

## Layout do projeto / Project layout
https://www.figma.com/file/0kv33XYjvOgvKGKHBaiR07/GamePlay---NLW-Together?node-id=58913%3A83

## Features
- Autenticação Social OAuth2 com servidor do Discord / Discord OAuth2 Social authentication  
- Obtém perfil do usuário cadastrado no Discord (username e avatar) / It uses username and avatar from Discord profile account   
- Lista os servidores do Discord que o usuário faz parte / Lists user's Discord servers
- Permite realizar o agendamento de partidas / Allows you to schedule matches
- Permite filtrar as partidas por categoria / Filters matches by category
- Exibe se a partida foi agendada em um servidor próprio (anfitrião) ou em servidores de outros (convidado) / Allows you to check if the match was scheduled on your own server or on a guest server
- Compartilha o convite para ingressar no servidor do usuário / Shares the invitation to join the user's server
- Permite redirecionar o usuário para o seu próprio servidor / Allows users to be redirected to their own server
- Disponibiliza a função de Logout / Logout method

## Techs
- React Native
- Typescript
- Expo
- Context API
- Async Storage
- Vector Icons
- React Native Svg e Svg Transform
- Axios
- Gradient colors
- OAuth2 Discord
- Expo Google Fonts
- React Navigation Stack
- React Native Gesture Handler
- Expo Authentication
- React Native Share
- Deep Link

## Instalação / Installing

Clonando o repositório / Clone the repository
```
$ git clone https://github.com/madsongr/nlw-06-gameplay-app
$ cd nlw-06-gameplay-app
```
Instalando as dependências / Installing dependencies
```
$ yarn install
```
ou/or
```
$ npm install
```
Executando o projeto / Running the project
```
$ expo start
```
