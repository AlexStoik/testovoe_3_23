<template>
    <div>
        <div v-if="posts.length > 0">
            <h3>Список постов</h3>
            <transition-group name="post-list">
                <post-item
                    v-for="post in posts"
                    :key="post.id"
                    :post="post"
                    @remove="$emit('remove', post)"
                ></post-item>
            </transition-group>
        </div>
        <div v-else>
            <h3>Список постов пуст</h3>
        </div>
    </div>
</template>
  
<script>
import PostItem from '@/components/PostItem';
export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: { PostItem }
}
</script>

<style>
.post-list-item {
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.5s ease;
}
</style>
  