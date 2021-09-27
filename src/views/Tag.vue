<template>
  <div>
      <div v-if="error">{{ error }}</div>
      <div v-if="posts.length" class="layout">
          <PostList :posts="postsWithTag" />
          <TagCloud :posts="posts" />
      </div>
      <div v-else>
          <Spinner />
      </div>
  </div>
</template>

<script>
    // component imports
    import getPosts from '../composables/getPosts'
    import PostList from '../components/PostList.vue'
    import Spinner from '../components/Spinner.vue'
    import TagCloud from '../components/TagCloud.vue'
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'

    export default {
        components: { PostList, Spinner, TagCloud },
        setup() { 
            const { posts, error, load } = getPosts()
            load()

            //get the current tag
            const route = useRoute()
            const tag = route.params.tag

            const postsWithTag = computed(() => {
                return posts.value.filter((p) => p.tags.includes(tag))
            })
            return { posts, error, postsWithTag }
        },
    }
</script>

<style>
    .tag {
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;
    }
</style>