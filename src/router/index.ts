import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import ProjectList from '@/components/ProjectList.vue';
import EditProject from '@/components/EditProject.vue';
import AddNewProject from '@/views/AddNewProject.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/new-project',
    name: 'NewProject',
    component: AddNewProject,
  },
  {
    path: '/projects',
    name: 'ProjectList',
    component: ProjectList,
  },
  {
    path: '/cards',
    name: 'ProjectCard', 
    component: ProjectCard,
  },
  {
    path: '/edit-project/:id',
    name: 'EditProject',
    component: EditProject,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
