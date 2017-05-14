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
      preview: {}
    }
  },
  methods: {
    getPreview: async function (url, opt = {}) {
      opt.headers = {
        'Method': 'GET',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }
      opt.mode = 'cors'
      try {
        let response = await fetch(`https://us-central1-showerbucket-1a754.cloudfunctions.net/preview?url=${url}`, opt);
        this.preview = await response.json();
        console.log(this.preview)
      } catch (e) {
        return e.message;
      }
    }
  },
  created() {
      this.getPreview(this.link.link);
  }
}
</script>
