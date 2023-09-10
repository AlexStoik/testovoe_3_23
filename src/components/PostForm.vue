<template>
    <form @submit.prevent>
        <h4>Добавление постов</h4>
        <my-input
            v-focus
            v-model="post.title"
            placeholder="введите название"
        ></my-input>
        <my-input
            v-model="post.body"
            placeholder="введите описание"
        ></my-input>
        <my-button style="margin-top: 0.5rem;" @click="addPost">Добавить</my-button>
    </form>
</template>
  
<script>
export default {
    data() {
        return {
            post: {
                title: "",
                body: ""
            }
        };
    },
    methods: {
        addPost() {
            this.post.id = Date.now();
            this.$emit("create", this.post);
            this.post = {
                title: "",
                body: ""
            };
        }
    }
}
</script>
  
<style>
form {
    display: flex;
    flex-direction: column;
}
</style>
  