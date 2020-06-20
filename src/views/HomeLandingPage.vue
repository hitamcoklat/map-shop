<template>
    <div style="max-width: 450px;" class="container">
        <navbar-user />
            <div>
            <b-carousel>
                <b-carousel-item>
                    <img alt="satu" src="https://ik.imagekit.io/igtoko/104410973_1525988394248123_1059615336302501060_n_kcDTkqJp8.jpg">
                </b-carousel-item>
                <b-carousel-item>
                    <img alt="dua" src="https://ik.imagekit.io/igtoko/104717929_869972033526274_5116702397748313616_n_HH0Xx-9Qv7.jpg">
                </b-carousel-item>
            </b-carousel>             
            </div>
            <div style="margin-top: 2em;" class="card-columns  columns-6-xl columns-5-lg columns-4-md columns-3-sm ">

                <div style="padding: 5px;" v-for="(item, index) in fotoProduk" :key="index" :ref="index" v-on:click="toShop(item.USERNAME)" class="card card-content">
                    <img style="width: 100%;" :alt="item.USERNAME" v-lazy="item.COVER_IMAGE">
                    {{item.USERNAME}}
                </div>

            </div>
            <br />
            <br />
            <br />
            <br />
      <footer style="  position: fixed;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
  padding: 1em;
  max-width: 450px;
  ">
        <div class="content has-text-centered">
          <div class="buttons">
              <b-button @click="toRegisterPage()" size="is-large" style="background-color: #ff697b; color: white; border: 1px solid #CCC;" expanded>Buat Toko Anda.</b-button>
          </div>          
        </div>
      </footer>
      <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>          
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
   column-count: 2;
}
.columns-5 {
   column-count: 2;
}
.columns-4 {
   column-count: 2;
}
.columns-3 {
   column-count: 2;
}
.columns-2 {
   column-count: 2;
}
.columns-1 {
   column-count: 2;
}

@media (min-width: 576px) {
  .columns-6-sm {
    column-count: 2;
  }
  .columns-5-sm {
    column-count: 2;
  }
  .columns-4-sm {
    column-count: 2;
  }
  .columns-3-sm {
    column-count: 2;
  }
  .columns-2-sm {
    column-count: 2;
  }
  .columns-1-sm {
    column-count: 2;
  }
}

@media (min-width: 768px) {
  .columns-6-md {
    column-count: 2;
  }
  .columns-5-md {
    column-count: 2;
  }
  .columns-4-md {
    column-count: 2;
  }
  .columns-3-md {
    column-count: 2;
  }
  .columns-2-md {
    column-count: 2;
  }
  .columns-1-md {
    column-count: 2;
  }
}

@media (min-width: 992px) { 
  .columns-6-lg {
    column-count: 2;
  }
  .columns-5-lg {
    column-count: 2;
  }
  .columns-4-lg {
    column-count: 2;
  }
  .columns-3-lg {
    column-count: 2;
  }
  .columns-2-lg {
    column-count: 2;
  }
  .columns-1-lg {
    column-count: 2;
  }
}

@media (min-width: 1200px) { 
  .columns-6-xl {
    column-count: 2;
  }
  .columns-5-xl {
    column-count: 2;
  }
  .columns-4-xl {
    column-count: 2;
  }
  .columns-3-xl {
    column-count: 2;
  }
  .columns-2-xl {
    column-count: 2;
  }
  .columns-1-xl {
    column-count: 2;
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
  metaInfo: {
    title: 'IGtoko',
    titleTemplate: '%s - Berjualan semudah posting di Instagram!',
    htmlAttrs: {
      lang: 'id',
      amp: true
    }
  },  
  data: () => ({
    isShowModal: false,
    form: [],
    isLogin: false,
    isLoading: false,
    fotoProduk: []
  }),
  methods: {
      toPendaftaran: function() {
          this.$router.push('/p/buat-toko')
      },
      fetchData: function() {
        this.isLoading = true
        this.$http.get(this.$api + '/api/getListToko/')
            .then((res) => {
              this.isLoading = false
              this.fotoProduk = res.data.data
              this.fotoProduk.forEach((item, index) => {
                if(this.fotoProduk[index]['COVER_IMAGE'] == null) {
                  this.fotoProduk[index]['COVER_IMAGE'] = 'https://ik.imagekit.io/igtoko/no-image-icon-11_evq7Xk7Mt.PNG'
                }
              })
            })          
      },
      toShop: function(username) {
          this.$router.push('/' + username)
      },
      toRegisterPage: function() {
          this.$router.push('/p/price-list')
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
