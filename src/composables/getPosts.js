import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

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
            
            const res = await projectFirestore.collection('posts').get()
            
            console.log('RES IS:   '+res)
            // console.log(posts.value)
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { posts, error, load }
        
}

export default getPosts