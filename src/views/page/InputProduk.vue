<template>
    <div style="max-width: 450px;" class="container">
    <navbar-user />
    <section style="padding-left: 1em; padding-right: 1em; padding-top: 1em;">

        <b-field label="Nama Produk">
            <b-input 
                icon-pack="fas"
                icon="cookie-bite"
                v-model="form.nama_produk" 
                placeholder="Nama Produk..."></b-input>
        </b-field>
        <b-field label="Harga">
            <b-input
                icon-pack="fas"
                icon="tags"             
                type="number" 
                v-model="form.harga" 
                placeholder="Masukan harga"></b-input>
        </b-field>
        <b-field label="Deskripsi">
            <b-input v-model="form.caption" type="textarea"></b-input>
        </b-field>
        <b-field label="Berat (gram)">
            <b-input
                icon-pack="fas"
                icon="balance-scale-right"             
                type="number" 
                v-model="form.berat" 
                placeholder="Masukan berat produk"></b-input>
        </b-field>        
        <div v-if="fotoProduk.length > 0">
            <b-field label="Foto Produk">
            </b-field> 
            <div style="display: flex; flex-direction: row; margin-bottom: 1em;">
                <figure v-for="(item, index) in fotoProduk" :key="index" :ref="index" style="margin-right: 1px;" class="image is-64x64">
                    <img :alt="item.name" v-bind:src="item.thumbnailUrl">
                </figure>
            </div>
        </div>
        <IKContext
            style="margin-bottom: 1em; margin-top: 1em;"
            :publicKey="publicKey"
            :urlEndpoint="urlEndpoint"
            :authenticationEndpoint="authenticationEndpoint"           
        >
            <IKUpload 
                class="button is-default"
                fileName="igtoko.jpg" 
                v-bind:tags="['tag1']" 
                v-bind:responseFields="['tags']" 
                :onError="onError" 
                :onSuccess="onSuccess"
                @change="onChangeHandler"                
                />
        </IKContext>        
        <div class="buttons">
            <b-button v-on:click="submitProduk" type="is-primary" expanded>Buat Produk</b-button>
        </div>        
        <br />
        <br />
        <br />
    </section>
    </div>
</template>

<script>

import NavbarUser from './_NavbarUser'
import { IKImage, IKContext, IKUpload } from "imagekitio-vue";
let urlEndpoint= "https://ik.imagekit.io/igtoko";

export default {
  name: 'InputProduk',
  components: {
    'navbar-user': NavbarUser,
    IKImage,
    IKContext,
    IKUpload    
  },  
  data: () => ({
    isShowModal: false,
    form: [],
    file: null,
    urlEndpoint: "https://ik.imagekit.io/igtoko",
    publicKey: "public_lxCCE/BxwyGPmc6KsKr2uGXWenE=",
    authenticationEndpoint: 'http://192.168.43.55/project/igtoko/Upload',
    fotoProduk: []   
  }),
  methods: {
    submitProduk: function() {

        let data = {
            IMAGES: this.fotoProduk,
            NAMA_PRODUK: this.form.nama_produk,
            HARGA: this.form.harga,
            CAPTION: this.form.caption,
            BERAT: this.form.berat    
        }

        this.$http.post(this.$api + '/api/submitProduk', data)
            .then((res) => {
                console.log(res)
            })        

    },
    deleteDropFile(index) {
        this.dropFiles.splice(index, 1)
    },
    onSuccess(res) {
        this.fotoProduk.push(res)        
        console.log(res)
    },
    onError(err) {
        console.log(err)
    },
    onChangeHandler(e) {
        // console.log(e)
        console.log('uploading...')
    }
  },
  created() {
      
  },
  beforeCreate() {
      if(this.$store.getters.getLoginStatus == false) {
          alert('Anda belum login!')
          this.$router.push('/p/login')
      }      
  }   
}
</script>
