import noteApp from "./apps/keep/pages/note-app.js";
import homePage from "./pages/app-home.cmp.js";
import emailApp from './apps/mail/pages/email-app.js';
import emailDetails from "./apps/mail/pages/email-details.cmp.js";
import emailCompose from '../js/apps/mail/cmps/email-compose.cmp.js';

const routes = [
  {
    path: "/",
    component: homePage,
  },

  {
    path: "/note",
    component: noteApp,
  },

  {
    path: "/email",
    component: emailApp,
  },

  {
    path: "/email/:emailId",
    component: emailDetails,
  },

  {
    path: "/email/edit/:emailId?",
    component: emailCompose,
  },
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory(),
});
