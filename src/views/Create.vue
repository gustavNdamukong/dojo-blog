<template>
  <h1>Create</h1>
  <div class="create">
      <form @submit.prevent="handleSubmit">
          <label>Title:</label>
          <input v-model="title" type="text" required>

          <label>Content:</label>
          <textarea v-model="body" required></textarea>

          <label>Tags (hit enter to add a tag)</label>
          <input 
          v-model="tag" 
          type="text"
          @keydown.enter.prevent="handleKeydown"
          >

          <div v-for="tag in tags" :key="tag" class="pill">
              #{{ tag }}
          </div>    
          <button>Add Post</button>
      </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const title = ref('')
        const body = ref('')
        const tag = ref('')
        const router = useRouter()

        // create another var 'tags' to hold all entered tags that will be submitted
        const tags = ref([])

        const handleKeydown = () => {
            if (!tags.value.includes(tag.value)) {
                tag.value = tag.value.replace(/\s/, '') // removes all whitespace
                tags.value.push(tag.value)
            }
            //clear tag field so user can enter another tag
            tag.value = ''
        }

        const handleSubmit = async () => {
            // submit the data
            let data = {
                title: title.value,
                body: body.value,
                tags: tags.value
            }
            await fetch(' http://localhost:3000/posts', {
                method: 'POST',
                headers: { 'Content-Type':  'application/json' },
                // convert the data into a json string
                body: JSON.stringify(data)
            }).then(() => {
                // redirect to the home page
                router.push({ path: '/' })
            }).catch((err) => console.log(err))
        }

        return { title, body, tag, handleKeydown, tags, handleSubmit }
    }
}
</script>

<style>
      form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  /*place a blank string before the label so we can place color behind the label*/
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    /*force it to appear behind the label*/
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }
</style>