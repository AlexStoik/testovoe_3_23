<template>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    ></my-input>
    <div class="app__btns">
        <my-button>
            Добавить пост
        </my-button>
        <my-select
            v-model="selectedSort"
            :options="sortOptions"
        ></my-select>
    </div>
    <my-dialog v-model:show="formVisible">
        <post-form
            class="item"
        ></post-form>
    </my-dialog>
    <div v-if="!isPostLoading">
        <post-list
            class="item"
            :posts="sortedAndSeachedPosts"
        ></post-list>
    </div>
    <div v-else>
        <h4>Загрузка...</h4>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import { usePosts } from '@/hooks/usePosts'
import { useSortedPosts } from '@/hooks/useSortedPosts'
import { useSortedAndSeachedPosts } from '@/hooks/useSortedAndSeachedPosts'

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            formVisible: false,
            sortOptions: [
                { value: "title", name: "По названию" },
                { value: "body", name: "По описанию" },
                { value: "id", name: "По id" },
            ]
        }
    },
    setup(props) {
        const { posts, totalPages, isPostLoading } = usePosts(10)
        const { selectedSort, sortedPosts } = useSortedPosts(posts)
        const { searchQuery, sortedAndSeachedPosts } = useSortedAndSeachedPosts(sortedPosts)

        return {
            posts, totalPages, isPostLoading, selectedSort, sortedPosts, searchQuery, sortedAndSeachedPosts
        }
    }
}
</script>

<style>
.item {
    margin-bottom: 1rem;
}

.app__btns {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
}

.observer {
    height: 30px;
}
</style>
