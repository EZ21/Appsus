import noteApp from "./apps/keep/pages/note-app.js";
import homePage from "./pages/app-home.cmp.js";
import emailApp from './apps/mail/pages/email-app.js';
import emailDetails from "./apps/mail/pages/email-details.cmp.js";

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
        path: '/email',
        component: emailApp,
    },

    {
        path: '/email/:emailId',
        component:emailDetails,
    },
];

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory(),
});
