<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <!-- <my-button @click="$router.push('/store')" style="margin-right: 1rem;">Посты (Vuex)</my-button> -->
            <my-button @click="$router.push('/posts')" style="margin-right: 1rem;">Посты</my-button>
            <!-- <my-button @click="$router.push('/composition')" style="margin-right: 1rem;">Посты (Composition Api)</my-button> -->
            <my-button @click="$router.push('/about')">О сайте</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.navbar {
    height: 3rem;
    background-color: hsl(91, 28%, 84%);
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 1rem;
}
.navbar__btns {
    margin-left: auto;
}
</style>