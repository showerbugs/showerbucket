<template>
  <li><a :href="link.link">{{ link.link }}</a>
    <div>
      <h1>{{preview.Title}}</h1>
      <h5>{{preview.Description}}</h5>
      <img :src="preview.Images[0]" width="400"/>
    </div>
  </li>
</template>

<script>
export default {
  props: ['link'],
  data () {
    return {
      preview: {
        Images: []
      }
    }
  },
  methods: {
    getPreview: function (url, opt = {}) {
      let response =  fetch(`https://us-central1-showerbucket-1a754.cloudfunctions.net/preview?url=${url}`)
      .then(res => res.json())
      .then(json => {
        this.preview = json.Preview
      })
      //let response = await fetch(`https://jsonplaceholder.typicode.com/posts/1`)
      ///this.preview = await response.json()
      // opt.method = 'GET'
      // // opt.headers = new Headers({
      // //   'Content-Type': 'application/json',
      // // });
      // opt.mode = 'cors'
      // try {
      //   let response = await fetch(`https://us-central1-showerbucket-1a754.cloudfunctions.net/preview?url=${url}`, opt)
      //   //let response = await fetch(`https://jsonplaceholder.typicode.com/posts/1`)
      //   this.preview = await response.json()
      // } catch (e) {
      //   console.log(e.message);
      //   return e.message
      // }
    }
  },
  created() {
      this.getPreview(this.link.link)
  }
}
</script>
