<p align="center">
   <img src="https://github.com/MartinRybergLaude/GameSquad/blob/master/public/gamesquad.svg?raw=true" width="80" alt="">
</p>
<h1 align="center">
  GameSquad
</h1>
<p align="center">
  Squad up and vote for what games to play.
</p>
<p align="center">
    <a href="https://gamesquad.win">Live</a>
</p>

## 💡 Introduction

GameSquad is used by groups to and browse and decide upon which games to play together. Depending on the size and interests of the group, different games with different multiplayer modes are suggested. Members of the group are able to add games to a list of "possible games". The members can then choose and vote between the games to decide on one to play together.

## ✅ Prerequisites

- Node.js
- pnpm

## 🚀 Quick start

1.  **Clone this repo**

    Use git to clone this repo, or download it.

    ```shell
    # Clone the repo to a local directory
    git clone git@github.com:MartinRybergLaude/GameSquad.git
    ```

2.  **Install**

    Open cmd, terminal or powershell in the cloned direcory and install

    ```shell
    cd GameSquad
    pnpm i
    ```

3.  **Start the app**

    Start the app on `http://localhost:5173`

    ```shell
    pnpm dev
    ```

    Firebase keys are by default the live version's keys, which is **not** a security issue due to Firestore's security rules. Override firebase.json if you want to use your own firebase setup.

## 🧐 Technologies

- Vite.js
- React.js
- Typescript
- Mantine
- Framer Motion
- Tanstack Query

among others :)

## 📁 Directory structure

- Package by feature as far as possible

## 📑 Code conventions

- Functional components
- Props & state interface above components
- Async/await preferred

## 📑 Git conventions

- Commit messages are written in <a href="https://en.wikipedia.org/wiki/Imperative_mood">imperative mood</a>
- Commit messages follow the following structure:
  Type: Short title
  Optional explanatory body
- Micro-commits are preferred
