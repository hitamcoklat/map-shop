<template>
    <div style="max-width: 480px;" class="container">
        
        <navbar-user />

        <div style="padding-left: 10px; padding-right: 10px; margin-top: 1.8em;">
            <section>

                <b-collapse
                    class="card"
                    animation="slide"
                    v-for="(collapse, index) of collapses"
                    :key="index"
                    :open="isOpen == index"
                    @open="isOpen = index">
                    <div
                        slot="trigger"
                        slot-scope="props"
                        class="card-header"
                        role="button">
                        <p class="card-header-title">
                            {{ collapse.title }}
                        </p>
                        <a class="card-header-icon">
                            <b-icon
                                :icon="props.open ? 'menu-down' : 'menu-up'">
                            </b-icon>
                        </a>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            {{ collapse.text }}
                        </div>
                    </div>
                </b-collapse>

            </section>
        </div>        
    </div>
</template>
<script>

import NavbarUser from './_NavbarUser'

export default {
  name: 'Manage',
  components: {
    'navbar-user': NavbarUser
  },
  data: () => ({
    isOpen: 0,
    collapses: [
        {
            title: 'Apakah saya bisa memasang di website saya?',
            text: 'Jika anda ingin memasang di hosting/server anda dengan domain anda sendiri silahkan hubungi saya.'
        },
        {
            title: 'Apakah saya bisa menambahkan fitur?',
            text: 'Bisa. Namun jika anda ingin menambahkan fitur, anda harus memasang di hosting/domain anda sendiri.'
        }
    ]      
  }),
  methods: {
      toPage: function(page) {
          this.$router.push('/p/' + page)
      }
  },
  created() {

  },
  beforeCreate() {

  }
}
</script>