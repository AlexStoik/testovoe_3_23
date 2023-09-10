import axios from 'axios';
export const postModule = {
    state: () => ({
        postLoading: false,
        posts: [],
        searchQuery: "",
        selectedSort: "",
        page: 1,
        totalPages: 0,
        limit: 10,
        sortOptions: [
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
            { value: "id", name: "По id" },
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => state.selectedSort == "id" ? post1[state.selectedSort] > post2[state.selectedSort] : post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.postLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, sort) {
            state.selectedSort = sort
        },
        setTotalPages(state, pages) {
            state.totalPages = pages
        },
        setSearchQuery(state, seach) {
            state.searchQuery = seach
        },
    },
    actions: {
        async fetchPosts({ state, commit }) {
            try {
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page
                    }
                })
               commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
               commit('setPosts', response.data)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false)
            }
        },
        async getMorePosts({ state, commit }) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}