import { createApp, computed } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

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
import QuizPage from './pages/QuizPage.vue';
import QuizUndergoPage from './pages/QuizUndergoPage.vue'

// Get isAuthenticated value from store
const isAuthenticated = computed(() => store.getters['auth/getIsAuthenticated'])
const isCompanyMember = computed(() => store.getters['users/getIsCompanyMember'])
const isCompanyOwner = computed(() => store.getters['users/getIsCompanyOwner'])
const isUserTakingQuiz = computed(() => store.getters['quizzes/getIsUserTakingQuiz'])

// Url paths for pages
const routes = [
  { path: '/', component: () => HomePage, name: 'Home' },
  { path: '/about', component: () => AboutPage, name: 'About' },
  {
    path: '/companies',
    component: () => CompaniesListPage,
    name: 'CompaniesList',
    meta: { requiresAuth: true } // Requires authentication
  },
  {
    path: '/companies/:id',
    component: () => CompanyProfilePage,
    name: 'CompanyProfile',
    meta: { requiresAuth: true } // Requires authentication
  },
  { path: '/login', component: () => LoginPage, name: 'Login' },
  {
    path: '/users',
    component: () => UsersListPage,
    name: 'UsersList',
    meta: { requiresAuth: true } // Requires authentication
  },
  {
    path: '/users/:id',
    component: () => UserProfilePage,
    name: 'UserProfile',
    meta: { requiresAuth: true } // Requires authentication
  },
  { path: '/sign-up', component: () => SignUpPage, name: 'SignUp' },
  {
    path: '/quizzes/:id',
    component: () => QuizPage,
    name: 'QuizPage',
    meta: { requiresCompanyMember: true, requiresCompanyOwner: true },
  },
  {
    path: '/quizzes/:id/undergo_quiz/:quizResultId',
    component: () => QuizUndergoPage,
    name: 'QuizUndergo',
    meta: { requiresIsUserTakingQuiz: true },
  },
];

// Creating a router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router guard
router.beforeEach((to, from, next) => {
  // If route requires auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If not authenticated -> redirect to home page
    if (!isAuthenticated.value) {
      next('/')
    } else { // If authenticated -> OK
      next()
    }
  } else if (
    to.matched.some(
      record => record.meta.requiresCompanyMember &&
        record.meta.requiresCompanyOwner
    )
  ) {
    if (isCompanyOwner.value || isCompanyMember.value) {
      next()
    } else {
      next('/')
    }
    // Quiz undergo validation
  } else if (to.matched.some(record => record.meta.requiresIsUserTakingQuiz)) {
    if (isUserTakingQuiz.value) next()
    else next('/')
  } else {
    next()
  }
})

// i18n configuration
import { createI18n } from 'vue-i18n'
import { languages, defaultLocale } from './i18n';

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
});

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(store);

app.mount('#app');
