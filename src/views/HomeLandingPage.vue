<template>
    <div>
        <div style="position: relative;">
          <navbar-user style="max-width: 450px; position: fixed; margin-left: auto; margin-right: auto; left: 0; right: 0;" @tentangDialog="tentangDialog" />     
          <l-map
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 93vh; z-index: 1;"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
          >
            <l-circle
              :lat-lng="center"
              :radius="circle.radius"
            />               
            <l-tile-layer
              :url="url"
              :attribution="attribution"
            />               
            <l-marker
              :lat-lng="center"
              :icon="iconPerson"
            >   
            </l-marker>                
            <l-marker
              v-for="(item, index) in arrayMarker"
              :key="'marker-' + index"
              :lat-lng="item.lokasiTempat"
              :icon="icon"
            >
              <l-tooltip :options="{ permanent: true, interactive: true }">
                <div @click="innerClick(item)">
                  <strong>@{{item.usernameToko}}</strong>
                </div>
              </l-tooltip>      
            </l-marker>
          </l-map> 
          <div>
          </div>               
          <footer
            style="color: white;
                  position: fixed;
                  text-align: center;
                  margin-left: auto;
                  margin-right: auto;
                  left: 0;
                  right: 0;
                  bottom: 10px;
                  max-width: 450px;
                  z-index: 9999;">
              <Carousel v-bind:dataToko="arrayMarker" />                       
<!--             <div v-if="btnKDaftarToko" style="width: 90%; margin-left: auto; margin-right: auto;" class="content has-text-centered">
              <div class="buttons">
                  <b-button @click="toRegisterPage()" size="is-large" style="background-color: #ff697b; color: white; border: 1px solid #CCC;" expanded>Buat Toko Anda.</b-button>
              </div>          
            </div> -->
          </footer>                                                                  
        </div>        
        <b-modal
          style="z-index: 9999;" 
          :active.sync="isComponentModalActive"
          has-modal-card
          trap-focus
          :destroy-on-hide="false"
          :on-cancel="tutupModal"
          aria-role="dialog"
          aria-modal>
          <modal-toko v-bind:dataToko="dataToko"></modal-toko>
        </b-modal>           

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
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LCircle, LIcon } from "vue2-leaflet";
import { Icon } from 'leaflet';
import NavbarUser from './page/_NavbarUser'
import ModalToko from './ModalToko'
import Carousel from '../components/Carousel'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'HomeLandingPage',
  components: {
    'navbar-user': NavbarUser,
    Carousel,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    ModalToko,
    LCircle,
    LIcon
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
    icon: L.icon({
      iconUrl: 'https://ik.imagekit.io/igtoko/icons8-shop-100_2__AxYVUrSjrv.png',
      iconSize: [36, 41],
      iconAnchor: [24, 20]
    }), 
    iconPerson: L.icon({
      iconUrl: 'https://ik.imagekit.io/igtoko/icons8-street-view-100_o3F2JOLnMBb.png',
      iconSize: [36, 41],
      iconAnchor: [10, 20]
    }), 
    iconSize: 64,   
    isComponentModalActive: false,
    dataToko: [],    
    isShowModal: false,
    form: [],
    isLogin: false,
    isLoading: false,
    fotoProduk: [],
    btnKDaftarToko: true,
    zoom: 17,
    center: latLng(-6.9005281, 107.5985346),
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    withPopup: latLng(-6.9005281, 107.5985346),
    withTooltip: latLng(47.41422, -1.250482),
    currentZoom: 11.5,
    currentCenter: latLng(-6.9005281, 107.5985346),
    showParagraph: false,
    arrayMarker: [],
    mapOptions: {
      zoomSnap: 0.5
    },
    circle: {
      radius: 4500
    },       
  }),
  methods: {
      toPendaftaran: function() {
          this.$router.push('/p/buat-toko')
      },
      fetchData: function() {
        this.isLoading = true
        this.$http.get(this.$api + '/api/getListToko/')
            .then((res) => {
              this.arrayMarker = []
              this.isLoading = false
              this.fotoProduk = res.data.data
              this.fotoProduk.forEach((item, index) => {             
                if(this.fotoProduk[index]['COVER_IMAGE'] == null) {
                  this.fotoProduk[index]['COVER_IMAGE'] = 'https://ik.imagekit.io/igtoko/no-image-icon-11_evq7Xk7Mt.PNG'
                }
                this.arrayMarker.push({
                  lokasiTempat: latLng({
                    lat: item.LATITUDE, lng: item.LONGITUDE
                  }),
                  usernameToko: item.USERNAME,
                  imageCover: item.COVER_IMAGE,
                  bioToko: item.ALAMAT
                })                  
              })
            })          
      },
      tutupModal: function() {
        if(this.$store.getters.getLoginStatus == true) {
          this.isLogin = true
          this.btnKDaftarToko = false
        }else {
          this.btnKDaftarToko = true
        }
      },
      onResize() {
        this.$refs.map.mapObject._onResize();
      },       
      toShop: function(username) {
          this.$router.push('/' + username)
      },
      toRegisterPage: function() {
          this.$router.push('/p/price-list')
      },
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        this.currentCenter = center;
      },
      showLongText() {
        this.showParagraph = !this.showParagraph;
      },
      tentangDialog: function(value) {
        console.log(value)
        if(this.$store.getters.getLoginStatus == true) {
            this.isLogin = true
            this.btnKDaftarToko = false
        } else {
          this.btnKDaftarToko = !value
        }        
      },
      innerClick(item) {
        console.log(item)
        this.dataToko = item;
        this.isComponentModalActive = true
        this.btnKDaftarToko = false
      }      
  },
  created() {
    this.$getLocation({
      enableHighAccuracy: true, //defaults to false
      timeout: Infinity, //defaults to Infinity
      maximumAge: 0 //defaults to 0
    }).then(coordinates => {
        console.log(coordinates);
        this.center = latLng({ lat: coordinates.lat, lng: coordinates.lng })
        this.currentCenter = latLng({ lat: coordinates.lat, lng: coordinates.lng })
        this.withTooltip = latLng({ lat: coordinates.lat, lng: coordinates.lng })
    });

    if(this.$store.getters.getLoginStatus == true) {
        this.isLogin = true
        this.btnKDaftarToko = false
        this.btnKelolaToko = true
    }
    this.fetchData()
  } 
}
</script>
