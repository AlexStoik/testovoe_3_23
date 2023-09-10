<template>
    <div class="post">
        <div>
            <div>ID: {{ post.id }}</div>
            <div><strong>Название: {{ post.title }}</strong></div>
            <div>Описание: {{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button
                @click="$router.push(`/posts/${post.id}`)"
                style="margin-right: 1rem;"
            >Открыть</my-button>
            <my-button @click="$emit('remove', post)">Удалить</my-button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>
  
<style>
.post {
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns {
    display: flex;
}
</style>
  