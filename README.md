# Front-end project using Vue.js framework

## Framework, tools and libraries used:

1. [Vue.js](https://vuejs.org/)
2. Project scaffolding with [Vue Cli](https://cli.vuejs.org/)
3. Styling with [Vuetify](https://vuetifyjs.com/en/introduction/why-vuetify/)
4. State management in the project with [Vuex](https://vuex.vuejs.org/)
5. Router config and API calls with [v-router](https://router.vuejs.org/) and [vue-resources](https://github.com/pagekit/vue-resource)
6. Dates and time config with [moment and moment-timezone](https://momentjs.com/)
7. Vue tooling for VS Code with [Vetur](https://vuejs.github.io/vetur/)
8. Validation management with [vuelidate](https://vuelidate.js.org/)
9. Convert DOM to image and download image using [dom-to-image](https://github.com/tsayen/dom-to-image) and [downloadjs](https://github.com/rndme/download)
10. CI and CD deployment with [Github action](https://github.com/features/actions), [Docker-hub](https://hub.docker.com/) and [Heroku](https://www.heroku.com/)

## API used

1. [Quotes API](https://favqs.com/api/qotd) is used for testing purpose, which will re replaced by actual API coming from backend of [Inspirational-quote-api](https://github.com/krishna-thapa/Inspirational-quote-api)
2. [Dictionary API](https://developer.wordnik.com/docs#/) is used to get word of the day, have to request API from the website

## Github actions uses

1. For npm install and test: https://github.com/actions/setup-node
2. For Build and publish docker images: https://github.com/marketplace/actions/build-tag-publish-docker

## Project layout setup

- Home page where there are APIs call
- User's home page
- Login and Sign up page for user
- Pixel draw page where user can draw pixel art and can download as jpg image
- Todo page where user can make todo item list and do simple CRUD operation

## TODO in future

- [ ] Vue.js test with [Cypress](https://www.cypress.io/) or [jest](https://vuejs.org/v2/guide/unit-testing.html)
- [ ] Deploy to cloud using [Heroku](https://www.heroku.com/)
- [ ] User authentication using JSON Web Token (JWT)
- [ ] Uploading images directly to Amazon S3
- [ ] Use Firebase and Firestore to store database and fire-storage instead of S3
- [ ] Use Firebase authentication and authorization

## Current issues:

- [ ] API is not working while running docker-image once pulled from docker-hub, since API key ios in stored in environment variable, have to look into what can be done
- [ ] Hot reload is not working while running web application through docker container, maybe since the app is not a SPA, it is using vue-router and have to look how it cane be handle

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## WHY?

I built this application to learn Vue.js and front-end side with CI/CD tools.
