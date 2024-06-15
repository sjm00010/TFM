import Editor from '@/views/Editor';
import Inicio from '@/views/Inicio';
import ListaEjercicios from '@/views/ListaEjercicios';
import Modificador from '@/views/Modificador';
import Realizar from '@/views/Realizar';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/ejercicios',
      name: 'Lista',
      component: ListaEjercicios
    },
    {
      path: '/ejercicios/nuevo',
      name: 'Editor',
      component: Editor,
      beforeEnter: (to, from, next) => {
        if (!sessionStorage.getItem("user") || !sessionStorage.getItem("pass")) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: '/ejercicios/modificar/:tipo/:id',
      name: 'Modificador',
      component: Modificador,
      beforeEnter: (to, from, next) => {
        if (!sessionStorage.getItem("user") || !sessionStorage.getItem("pass")) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: '/ejercicios/:tipo/:id',
      name: 'Realizar',
      component: Realizar
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
