import { ref } from 'vue'
import { db } from '../firebase/config'

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)
    const load = async () => {
        // because we have denoted this func as 'async', we can use the 'await' keyword inside
        // it 
        // use try/catch in order to handle errors since you're working with async & wait
        try {
            // simulate delay of 2 secs (only do this to test locally)
            // await new Promise(resolve => {
            //     setTimeout(resolve, 2000)
            // })

            //--------------------------------
            const res = await db.collection('posts')
                .orderBy('createdAt', 'desc')
                .get()
            posts.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
            //--------------------------------
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { posts, error, load }
        
}

export default getPosts