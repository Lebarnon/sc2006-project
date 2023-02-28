<template>
    <div class="text-center">
      <v-select 
        v-model="location"
        :items="locations"
        label="Location"
      ></v-select>  
    </div>
</template>

<script>
  export default {
    data: () => ({
      locations: [
        'Select From Your Favourites',
        '33 Chai Chee Avenue, S461033',
        '13 Novena Terrace, S307909'
      ],
      location: 'Select From Your Favorites',
    }),

    watch:{
      location(newLocation, oldLocation){
        if(newLocation != "Select From Your Favourites"){
          this.$emit('open')
        }
      }
    }
  }
</script> 

<style>

</style>