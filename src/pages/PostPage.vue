<template>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    ></my-input>
    <div class="app__btns">
        <my-button @click="showForm">
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
            @create="addPost"
        ></post-form>
    </my-dialog>
    <div v-if="loaded">
        <post-list
            class="item"
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
        ></post-list>
    </div>
    <div v-else>
        <h4>Загрузка...</h4>
    </div>
    <div v-intersection="getMorePosts" class="observer"></div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            loaded: false,
            posts: [
            ],
            formVisible: false,
            searchQuery: "",
            selectedSort: "",
            page: 0,
            totalPages: 0,
            limit: 10,
            sortOptions: [
                { value: "title", name: "По названию" },
                { value: "body", name: "По описанию" },
                { value: "id", name: "По id" },
            ]
        }
    },
    mounted() {
        this.getMorePosts()
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => this.selectedSort == "id" ? post1[this.selectedSort] > post2[this.selectedSort] : post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
    },
    methods: {
        addPost(post) {
            this.posts.push(post)
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showForm() {
            this.formVisible = !this.formVisible
        },
        async getMorePosts() {
            try {
                this.page++

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: this.limit,
                        _page: this.page
                    }
                })

                this.posts = [...this.posts, ...response.data]
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            } catch (e) {
                alert("Ошибка")
            }
            this.loaded = true
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
