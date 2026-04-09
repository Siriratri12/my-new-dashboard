// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/HomePage.vue';
// import About from '@/views/About.vue';
import PageNotFound from '@/views/PageNotFound.vue';
// app
import FormPage from '@/views/apps/FormPage.vue';
import DialogPage from '@/views/apps/DialogPage.vue';
import TablePage from '@/views/apps/TablePage.vue';
import TabPage from '@/views/apps/TabPage.vue';
import EventPage from '@/views/apps/EventPage.vue';
import CalculatePage from '@/views/apps/CalculatePage.vue';
import ParentComponentPage from '@/views/apps/ParentComponentPage.vue';
import StudentComponentPage from '@/views/apps/StudentComponentPage .vue';
import ParentPage from '@/views/apps/ParentPage.vue';
import FruitList from '@/views/apps/FruitList.vue';
import DashboardPage from '@/views/apps/DashboardPage.vue';
import ExampleComponent from '@/views/apps/ExampleComponent.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history', // This allows you to use history mode, which removes the # from the URL
  routes: [
    {
      path: '/',
      name: 'Home Page',
      component: HomePage
    },
    {
      path: '*', // Catch-all route for 404 NotFound page
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/form',
      name: 'Form Page',
      component: FormPage
    },
    {
      path: '/dialog',
      name: 'Dialog Page',
      component: DialogPage
    },
    {
      path: '/table',
      name: 'Table Page',
      component: TablePage
    },
    {
      path: '/tab',
      name: 'Tab Page',
      component: TabPage
    },
    {
      path: '/event',
      name: 'Event Page',
      component: EventPage
    },
      {
      path: '/calcalate',
      name: 'Calcalate Page',
      component: CalculatePage
    },
    {
      path: '/Parent',
      name: 'Parent Page',
      component: ParentComponentPage
    },
    {
      path: '/Student',
      name: 'Student Page',
      component: StudentComponentPage
    },
    {
      path: '/Hello',
      name: 'Hello Page',
      component: ParentPage
    },
    {
      path: '/Fruit',
      name: 'Fruit Page',
      component: FruitList
    },
    {
      path: '/dashboard',
      name: 'Dashboard Page',
      component: DashboardPage
    },
    {
      path: '/example',
      name: 'example Page',
      component: ExampleComponent
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: About
    // },
    
  ]
});

export default router;
