<template>
  <baidu-map class="map" center="北京">
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"/>
  </baidu-map>
</template>

<script>
export default {
  name: 'nearby',
  data () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .map {
    width: 100%;
    height: 400px;
  }
</style>
