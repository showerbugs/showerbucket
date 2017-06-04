<template>
  <a target="_blank" :href="link.link">
    <v-card horizontal>
      <v-card-row :img="preview.Images[0]" height="130px"></v-card-row>
      <v-card-column>
        <v-card-row height="75px" class="white black--text">
          <v-card-text>
            <strong>{{ preview.Title }}</strong>
            <div>{{ preview.Description }}</div>
          </v-card-text>
        </v-card-row>
        <v-card-row actions class="pl-3 pt-3 pb-3">
          <v-btn icon ripple @click.native.stop="deleteLink(link['.key'], $event)">
            <v-icon class="grey--text text--lighten-1">delete</v-icon>
          </v-btn>
        </v-card-row>
      </v-card-column>
    </v-card>
  </a>
</template>

<script>
export default {
  props: ['link', 'deleteLink'],
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
    },
  },
  created() {
      this.getPreview(this.link.link)
  }
}
</script>
