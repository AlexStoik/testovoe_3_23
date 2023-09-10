<template>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
    ></my-input>
    <div class="app__btns">
        <my-button @click="showForm">
            Добавить пост
        </my-button>
        <my-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions"
        ></my-select>
    </div>
    <my-dialog v-model:show="formVisible">
        <post-form
            class="item"
            @create="addPost"
        ></post-form>
    </my-dialog>
    <div v-if="!postLoading">
        <post-list
            class="item"
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
        ></post-list>
    </div>
    <div v-else>
        <h4>Загрузка...</h4>
    </div>
    <div
        v-intersection="getMorePosts"
        class="observer"
    ></div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            formVisible: false,
        }
    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        ...mapState({
            postLoading: state => state.post.postLoading,
            posts: state => state.post.posts,
            searchQuery: state => state.post.searchQuery,
            selectedSort: state => state.post.selectedSort,
            page: state => state.post.page,
            totalPages: state => state.post.totalPages,
            limit: state => state.post.limit,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
            sortedPosts: 'post/sortedPosts'
        })
    },
    watch: {
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            getMorePosts: 'post/getMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        addPost(post) {
            this.posts.push(post)
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showForm() {
            this.formVisible = !this.formVisible
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
