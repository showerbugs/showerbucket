<template>
  <li><router-link :to="{name: 'links', params: {bucketId: bucket['.key']}}" tag="a">{{ bucket.name }}</router-link></li>
</template>

<script>
export default {
  props: ['bucket']
}
</script>
