# Node Typescript Starter

This project contains a minimal starter for Node.js project with Typescript, ESLint and Prettier already configured

## Prerequisites
- Node.js 10+
- Yarn or NPM

## Installation
- Install dependencies
```bash
yarn install
```
- Start Application
```bash
yarn start
```
The application will be launched by [Nodemon](https://nodemon.com) so it's will restart automatically on file change

## Prerequisites

Following View will be opened on successful launch of backEnd server


<img width="1720" alt="Screenshot 2022-10-14 at 12 35 21 PM" src="https://user-images.githubusercontent.com/36517208/195783817-6429bfca-81d3-4e93-9e8e-fe3e73906431.png">

```
// Query is used read the data based on the `readShortestPathId` input provided

query($readShortestPathId: String!) {
readShortestPath(id: $readShortestPathId) {
  country
  id
  name
  distance
 }
}```

// Query is used read the data of all the cities

```query{
   readCountryInfo {
    id
    name
    country
  }
}```

