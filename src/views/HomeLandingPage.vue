<template>
    <div style="max-width: 450px;" class="container">
        <navbar-user />
            <div style="margin-top: 2em; padding-left: 1em; padding-right: 1em;" class="card-columns  columns-6-xl columns-5-lg columns-4-md columns-3-sm ">

                <div style="padding: 5px;" v-for="(item, index) in fotoProduk" :key="index" :ref="index" v-on:click="toShop(item.USERNAME)" class="card card-content">
                    <img style="width: 100%;" :alt="item.USERNAME" v-bind:src="item.COVER_IMAGE">
                    {{item.USERNAME}}
                </div>

            </div>
        </section>
    </div>
</template>
<style scoped>
.card-columns {
    column-count: 2;
}

.card-columns .card {
   display: inline-block;
   width: 100%;
   margin-bottom: 5px;
}

.columns-6 {
   column-count: 6;
}
.columns-5 {
   column-count: 5;
}
.columns-4 {
   column-count: 4;
}
.columns-3 {
   column-count: 3;
}
.columns-2 {
   column-count: 2;
}
.columns-1 {
   column-count: 1;
}

@media (min-width: 576px) {
  .columns-6-sm {
    column-count: 6;
  }
  .columns-5-sm {
    column-count: 5;
  }
  .columns-4-sm {
    column-count: 4;
  }
  .columns-3-sm {
    column-count: 3;
  }
  .columns-2-sm {
    column-count: 2;
  }
  .columns-1-sm {
    column-count: 1;
  }
}

@media (min-width: 768px) {
  .columns-6-md {
    column-count: 6;
  }
  .columns-5-md {
    column-count: 5;
  }
  .columns-4-md {
    column-count: 4;
  }
  .columns-3-md {
    column-count: 3;
  }
  .columns-2-md {
    column-count: 2;
  }
  .columns-1-md {
    column-count: 1;
  }
}

@media (min-width: 992px) { 
  .columns-6-lg {
    column-count: 6;
  }
  .columns-5-lg {
    column-count: 5;
  }
  .columns-4-lg {
    column-count: 4;
  }
  .columns-3-lg {
    column-count: 3;
  }
  .columns-2-lg {
    column-count: 2;
  }
  .columns-1-lg {
    column-count: 1;
  }
}

@media (min-width: 1200px) { 
  .columns-6-xl {
    column-count: 6;
  }
  .columns-5-xl {
    column-count: 5;
  }
  .columns-4-xl {
    column-count: 4;
  }
  .columns-3-xl {
    column-count: 3;
  }
  .columns-2-xl {
    column-count: 2;
  }
  .columns-1-xl {
    column-count: 1;
  }
}
</style>
<script>
import NavbarUser from './page/_NavbarUser'
export default {
  name: 'HomeLandingPage',
  components: {
    'navbar-user': NavbarUser
  },    
  data: () => ({
    isShowModal: false,
    form: [],
    isLogin: false,
    fotoProduk: []
  }),
  methods: {
      toPendaftaran: function() {
          this.$router.push('/p/buat-toko')
      },
      fetchData: function() {
        this.$http.get(this.$api + '/api/getListToko/')
            .then((res) => {
                this.fotoProduk = res.data.data
                console.log(res)
            })          
      },
      toShop: function(username) {
          this.$router.push('/' + username)
      }
  },
  created() {
      if(this.$store.getters.getLoginStatus == true) {
          this.isLogin = true
      }
      this.fetchData()
  } 
}
</script>
