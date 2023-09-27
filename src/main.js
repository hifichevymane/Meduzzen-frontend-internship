import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Importing Bootsrtap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

// Import pages
import HomePage from './pages/HomePage.vue';
import AboutPage from './pages/AboutPage.vue';
import CompaniesListPage from './pages/CompaniesListPage.vue';
import CompanyProfilePage from './pages/CompanyProfilePage.vue';
import LoginPage from './pages/LoginPage.vue';
import UserProfilePage from './pages/UserProfilePage.vue';
import SignUpPage from './pages/SignUpPage.vue';
import UsersListPage from './pages/UsersListPage.vue';

// Url paths for pages
const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/about', component: AboutPage, name: 'About' },
  { path: '/companies', component: CompaniesListPage, name: 'CompaniesList' },
  { path: '/company', component: CompanyProfilePage, name: 'CompanyProfile' },
  { path: '/login', component: LoginPage, name: 'Login' },
  { path: '/user', component: UserProfilePage, name: 'UserProfile' },
  { path: '/sign-in', component: SignUpPage, name: 'SignUp' },
  { path: '/users', component: UsersListPage, name: 'UsersList' },
];

// Creating a router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// i18n configuration
import { createI18n } from 'vue-i18n'
import { languages, defaultLocale } from './i18n/config.js';

// Copy from languages
const messages = Object.assign(languages)

// Get saved lang in local storage if it is
const localStorageLang = localStorage.getItem('lang');

const i18n = createI18n({
  legacy: false, // Work with Composition API

  // Default language if there is no saved language in local storage
  locale: localStorageLang || defaultLocale,

  fallbackLocale: 'en', // Default language if selected language doesn't exist
  messages, // All translations
})

const app = createApp(App);

app.use(router);
app.use(i18n);

app.mount('#app');
