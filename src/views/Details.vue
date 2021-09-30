<template>
  <h1>Details</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="post" class="post">
      <h3>{{ post.title }}</h3>
      <p class="pre">{{ post.body }}</p>
      <button @click="handleClick" class="delete">Delete post</button>
    </div>
    <div v-else>
        <Spinner />
    </div>
</template>

<script>
import getPost from '../composables/getPost'
import Spinner from '../components/Spinner.vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '../firebase/config'

export default {
    props: ['id'],
    components: { Spinner },
    setup(props) {
        const route = useRoute()
        const router = useRouter()
        const { post, error, load } = getPost(props.id)

        load()

        const handleClick = async () => {
            await db.collection('posts')
                .doc(props.id)
                .delete()

            router.push({ name: 'Home' })
        }

        return { post, error, handleClick }
    }

}
</script>

<style>
    .post {
        max-width: 1200px;
        margin: o auto;
    }
    .post p {
        color: #444;
        line-height: 1.5em;
        margin-top: 40px;
    }
    .pre {
        white-space: pre-wrap;
    }
    button.delete {
        margin: 10px auto;
        cursor: pointer;
    }
</style>