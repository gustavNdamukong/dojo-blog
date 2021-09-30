<template>
  <h1>Real-time Data</h1>
  <div v-for="post in posts" :key="post.id">
    <div>
        {{ post.title }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue' 
import { db } from '../firebase/config' 


export default {
    setup() {
        const posts = ref([])

        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                //console.log(snap)
                let docs = snap.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                console.log('Documents: ', docs)
                posts.value = docs
            })
        return { posts }    
    }
}
</script>

<style>

</style>