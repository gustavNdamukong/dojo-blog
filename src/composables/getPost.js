import { ref } from 'vue'

const getPost = (id) => {
    const post = ref(null)
    const error = ref(null)
    const load = async () => {
        // because we have denoted this func as 'async', we can use the 'await' keyword inside
        // it 
        // use try/catch in order to handle errors since you're working with async & wait
        try {
            // simulate delay of 2 secs
            // await new Promise(resolve => {
            //     setTimeout(resolve, 2000)
            // })

            let data = await fetch('http://localhost:3000/posts/' + id)
            //check if data is ok before you grab it (ok is a property in the response header)
            if(!data.ok) {
                throw Error('That post does not exist')
            }
            //Parse the data into hson data (using data.json())
            post.value = await data.json()
            console.log(post.value)
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { post, error, load }
        
}

export default getPost