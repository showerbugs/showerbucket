<template>
  <v-card>
    <v-card-row class="blue-grey darken-1">
      <v-card-title>
        <span class="white--text">{{ preview.Title }}</span>
      </v-card-title>
    </v-card-row>

    <v-card-row :img="preview.Images[0]" height="300px"></v-card-row>

    <v-card-text class="blue-grey darken-3 white--text">{{ preview.Description }}</v-card-text>
  </v-card>
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
      let response = fetch(`https://us-central1-showerbucket-1a754.cloudfunctions.net/preview?url=${url}`)
      .then(res => res.json())
      .then(json => {
        this.preview = json.Preview
      })
    }
  },
  created() {
      this.getPreview(this.link.link)
  }
}
</script>
