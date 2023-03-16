<template>
    <v-img
        :src="imageUrls.length > 0 ? imageUrls[curImgIndex] : ImagePlaceholder "
        height="400"
        width="400"
        cover
        class="mx-auto"
    />
    <v-slide-group
        v-model="curImgIndex"
        class="pa-4"
        show-arrows
    >
        <v-slide-group-item
            v-for="n in imageUrls.length"
            :key="n-1"
        >
            <v-card
            color="grey-lighten-1"
            class='ma-1'
            height="100"
            width="100"
            @click="onImageSelect(n-1)"
            >
            <v-img 
                height="100"
                width="100"
                :src="imageUrls[n-1]"
                cover/>
                
            </v-card>
        </v-slide-group-item>
    </v-slide-group>
</template>

<script setup>
import { ref } from 'vue';
import ImagePlaceholder from '@/assets/image-placeholder.jpeg'

const props = defineProps(['imageUrls'])
const curImgIndex = ref(0)

function onImageSelect(index){
    curImgIndex.value = index
}
</script>