<template>
  <li><a :href="link.link">{{ link.link }}</a></li>
</template>

<script>
export default {
  props: ['link']
}
</script>
