import { ref } from 'vue'
import { db } from '../firebase/config'

const getPost = (id) => {
    const post = ref(null)
    const error = ref(null)
    const load = async () => {
        // because we have denoted this func as 'async', we can use the 'await' keyword inside it 
        // use try/catch in order to handle errors since you're working with async & wait
        try {
            // simulate delay of 2 secs
            // await new Promise(resolve => {
            //     setTimeout(resolve, 2000)
            // })

            let res = await db.collection('posts').doc(id).get()

            // handle a case where no post can be found by that ID
            if (!res.exists) {
                throw Error('That post does not exist!')
            }
        
            post.value = { ...res.data(), id: res.id }
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { post, error, load }
        
}

export default getPost