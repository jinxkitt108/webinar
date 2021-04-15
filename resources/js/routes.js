import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/home",
        component: require("./layouts/MainLayout.vue").default,
        children: [
            { path: "/home", component: require("./pages/Home.vue").default },
            { path: "/students", component: require("./pages/Students.vue").default }
        ]
    },
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
