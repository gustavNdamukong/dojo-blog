// take in an array of posts
// cycle thru posts to get their tags
// add the tags of each post to the tag set (set has no duplicates)
// return a single array of tags based on that set
import { ref } from 'vue'

const useTags = (posts) => {
    const tags = ref([])
    // create a Set instance (rem-sets cannot contain dups)
    const tagSet = new Set()

    //cycle thru posts & add the tag of each post to the set
    posts.forEach(item => {
        item.tags.forEach(tag => tagSet.add(tag))
    })

    //we need to return an array not a set, so convert the set into an array
    tags.value = [...tagSet]

    return { tags }
}

export default useTags