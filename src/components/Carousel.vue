<template>
    <b-carousel-list :data="dataToko" :items-to-show="3" :arrow="false">
        <template slot="item" slot-scope="list">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-5by4">
                        <a @click="info()"><img :src="list.list.imageCover"></a>
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="subtitle is-7">@{{ list.list.usernameToko }}</p>
                    </div>
                </div>
            </div>
        </template>
    </b-carousel-list>
</template>

<script>
export default {
    props: ['dataToko'],
    data() {
        return {
            test: 0,
            items: []
        }
    },
    methods: {
        info(value) {
            console.log(value)
            this.test = value
        }
    },
    created() {

    }
}
</script>
