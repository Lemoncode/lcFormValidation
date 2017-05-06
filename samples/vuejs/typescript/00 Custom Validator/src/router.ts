import Router, {RouteConfig} from 'vue-router';
import {EditRecipeContainer} from './pages/recipe/edit';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/recipe/1' },
  { path: '/recipe/:id', component: EditRecipeContainer, props: true },
];

export const router = new Router({
  routes
});