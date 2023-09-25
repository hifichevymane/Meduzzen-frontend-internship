# .

# Meduzzen-frontend-intership

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## How to run the project using Docker

1. Create `.env` and write down all neccesary env variables like in `.env.sample`

2. Build the image of Dockerfile:

```sh
docker build --tag meduzzen_frontend .
```

3. Run docker compose:

```sh
docker-compose up --build
```

## How to run the project not using Docker

1. Create `.env` and write down all neccesary env variables like in `.env.sample`

2. Install all dependencies

```sh
npm install
```

3. Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
