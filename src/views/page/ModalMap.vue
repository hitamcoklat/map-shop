<template>
    <div class="modal-card" style="width: 100%; margin: 0 auto;">
        <header class="modal-card-head">
            <p style="font-size: 1.2em;" class="modal-card-title">Lokasi Toko</p>
        </header>
        <section class="modal-card-body">
            <b-notification
                type="is-warning"
                aria-close-label="Close notification"
                role="alert">
                Klik pada peta untuk menentukan lokasi toko anda.
            </b-notification>            
            <l-map
                ref="map" 
                v-resize="onResize"
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
                style="height: 300px; width: 100%;"
                @click="mapClick"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"                
            >
                <l-tile-layer
                    :url="url"
                /> 
                <l-marker
                  :lat-lng="center"
                >
                  <l-tooltip :options="{ permanent: true, interactive: true }">
                    <div>
                      <strong>Posisi Anda.</strong>
                    </div>
                  </l-tooltip>      
                </l-marker>                 
                <l-marker
                    :lat-lng="clickLokasiTempat"
                >                            
                </l-marker>                             
            </l-map>
        </section>
        <footer class="modal-card-foot">
            <button v-on:click="pilihPeta()" class="button is-primary" style="width: 100%;">Pilih Lokasi</button>
        </footer>
    </div>   
</template>
<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
    props: ['dataToko'],
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LTooltip        
    },    
    data () {
      return {
        zoom: 15,
        tutupModal: false,
        dialogFilterTahun: false,
        pilihLongLat: '',
        center: latLng(-6.9005281, 107.5985346),        
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        longlat: '',
        center: latLng(-6.9005281, 107.5985346),
        currentZoom: 11.5,
        currentCenter: latLng(-6.9005281, 107.5985346),
        clickLokasiTempat: latLng(-6.9005281, 107.5985346),
        mapOptions: {
          zoomSnap: 0.5
        },
        dataMap: [],    
      }
    },    
    methods: {
      toShop: function(username) {
          this.$router.push('/' + username)
      },
      onResize() {
        this.$refs.map.mapObject._onResize();
      },
      tutupDialog: function() {
        this.dialogExcell = false
      },    
      mapClick: function(e) {
        this.longlat = e.latlng.lat + ',' + e.latlng.lng
        console.log(this.longlat)
        this.clickLokasiTempat = latLng({
          lat: e.latlng.lat, lng: e.latlng.lng
        })        
      },
      pilihPeta: function() {
          this.tutupModal = true
          this.$emit('longlat', this.longlat)
      },
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        console.log(center)
        this.currentCenter = center;
      },         
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
    }
}
</script>