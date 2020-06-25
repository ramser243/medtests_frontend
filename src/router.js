import Vue from 'vue'
import VueRouter from 'vue-router'

const Welcome = () => import('./components/Welcome')
const ThemesPage = () => import('./components/themes/ThemesPage')
const ActionChoice = () => import('./components/action_choice/ActionChoice')
const Exam = () => import('./components/exam/Exam')
const ExamEnd = () => import('./components/exam/ExamEnd')
const ShowAnswers = () => import('./components/show_answers/ShowAnswers')
const Teaching = () => import('./components/teaching/Teaching')
const AdminLogin = () => import('./components/AdminLogin')

window.popStateDetected = false

window.addEventListener('popstate', () => {
    window.popStateDetected = true
})

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        component: Welcome,
        meta: {backPath: '#'}
    },
    {
        path: '/themes',
        component: ThemesPage,
        meta: {backPath: '#'}
    },
    {
        path: '/action_choice',
        component: ActionChoice,
        meta: {backPath: '/themes'}
    },
    {
        path: '/exam',
        component: Exam,
        meta: {backPath: '/action_choice'}
    },
    {
        path: '/exam_end',
        component: ExamEnd,
        meta: {backPath: '/action_choice'}
    },
    {
        path: '/show_answers',
        component: ShowAnswers,
        meta: {backPath: '/action_choice'}
    },
    {
        path: '/teaching',
        component: Teaching,
        meta: {backPath: '/action_choice'}
    },
    {
        path: '/admin',
        component: AdminLogin,
        meta: {backPath: '/action_choice'}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (window.popStateDetected) {
        window.popStateDetected = false
        if (from.meta.backPath === '#') {
            history.pushState(
                {},
                null,
                from.path
            )
            return false
        }
        router.replace(from.meta.backPath)
    }
    next()
})

export default router
