<template>
    <div>
      <h2>Graph Component</h2>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters({
        data: 'getData'
      })
    },
    mounted() {
      this.$store.dispatch('fetchData');
      // initialize chart using this.data
    }
  };
  </script>