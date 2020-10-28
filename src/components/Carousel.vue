<template>
    <carousel :perPage="3" :scrollPerPage="true" :paginationEnabled="false">
        <slide v-for="(item, index) in dataToko" :key="'carousel-' + index">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-5by4">
                        <a @click="info(item)">
                            <img :src="item.imageCover">
                        </a>
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="subtitle is-7">@{{ item.usernameToko }}</p>
                    </div>
                </div>
            </div>            
        </slide>
    </carousel>

</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    
    props: ['dataToko'],

    components: {
        Carousel,
        Slide
    },

    data() {
        return {
            test: 0,
            items: []
        }
    },
    methods: {
        info(value) {
            this.$emit('popFromChild', value)
        }
    },
    created() {

    }
}
</script>
