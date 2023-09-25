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

const app = createApp(App);

app.use(router);

app.mount('#app');
