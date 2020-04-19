# Front-end project using Vue.js framework

## Framework, tools and libraries used:

1. Vue.js (https://vuejs.org/)
2. Vuetify (https://vuetifyjs.com/en/introduction/why-vuetify/)
3. Vue tooling for VS Code: Vetur (https://vuejs.github.io/vetur/)
4. Vue state management: Vuex (https://vuex.vuejs.org/)
5. v-router and vue-resources to use router config and HTTP methods to call API
6. moment and moment-timezone to make use of clock and dates (https://momentjs.com/)
7. vuelidate for validation management (https://vuelidate.js.org/)
8. Convert DOM to image and download image using dom-to-image and downloadjs:
   - https://github.com/rndme/download
   - https://github.com/tsayen/dom-to-image
9. Realtime bindings between a Firebase RTDB or a Firebase Cloud Firestore and your Vue application: Vuefire (https://vuefire.vuejs.org/vuefire/): WIP

## API used

Just for testing purpose, will re replaced by actual API coming from backend of Inspirational-quote-api
Quote API: FavQs: https://favqs.com/api/qotd
Dictionary API: https://developer.wordnik.com/docs#/

## CI/CD: WIP

1. Github action (https://github.com/features/actions)
2. Use of Firebase for database, authentication and hosting (https://firebase.google.com/)

## Project layout setup

- Home page where there are APIs call
- User's home page
- Login and Sign up page for user
- Pixel draw page where user can draw pixel art and can download as jpg image
- Todo page where user can make todo item lits and do simple CRUD operation

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
