import Main from "@/pages/Main"
import PostPage from "@/pages/PostPage"
import About from "@/pages/About"
import { createRouter, createWebHistory } from "vue-router"
import DetailPost from "@/pages/DetailPost"
import PostPageStore from "@/pages/PostPageStore"
import PostPageCompositionApi from "@/pages/PostPageCompositionApi"

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: DetailPost
    },
    {
        path: '/store',
        component: PostPageStore
    },    {
        path: '/composition',
        component: PostPageCompositionApi
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;