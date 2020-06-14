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
                    <img :alt="item.thumb" v-bind:src="item.thumb">
                </figure>
            </div>
        </div>
        <div style="margin-bottom: 1em;" class="file">
            <label class="file-label">
                <input class="file-input" accept="image/x-png,image/gif,image/jpeg" type="file" ref="imageFile" @change="handleUpload">
                <span class="file-cta">
                    <span class="file-icon">
                        <font-awesome-icon icon="upload" />
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                </span>
            </label>
        </div>        
        <div style="margin-top: 1em;" class="buttons">
            <b-button v-on:click="submitProduk" type="is-primary" expanded>Buat Produk</b-button>
        </div>
        <br />
        <br />
        <br />
    </section>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    </div>
</template>

<script>

import NavbarUser from './_NavbarUser'
import ImageKit from 'imagekit-javascript';
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
    authenticationEndpoint: '',
    fotoProduk: [],
    isLoading: false  
  }),
  methods: {

    handleUpload: function () {

        this.isLoading = true;

        var imagekit = new ImageKit({
            publicKey : this.publicKey,
            urlEndpoint : this.urlEndpoint,
            authenticationEndpoint : this.authenticationEndpoint
        });

        var file = document.getElementById("file1");
        imagekit.upload({
            file : this.$refs.imageFile.files[0],
            fileName : "igtoko.jpg",
            tags : ["tag1"]
        }, (err, result) => {
            console.log(err)
            console.log(result)
            this.isLoading = false;
            let dataImage = {
                thumb: result.thumbnailUrl,
                img: result.url
            }            
            this.fotoProduk.push(dataImage)

            console.log(this.fotoProduk)
            // console.log(arguments);
            // console.log(imagekit.url({
            //     src: result.url,
            //     transformation : [{ height: 300, width: 400}]
            // }));
        })        

    },

    submitProduk: function() {

        let data = {
            IMAGES: this.fotoProduk,
            NAMA_PRODUK: this.form.nama_produk,
            HARGA: this.form.harga,
            CAPTION: this.form.caption,
            BERAT: this.form.berat,
            USERNAME: this.$store.getters.getUser.USERNAME 
        }

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }

        this.$http.post(this.$api + '/api/submitProduk', data, {
            headers: headers
        }).then((res) => {
            if(res.data.status == true) {
                this.form = {
                    nama_produk: '',
                    harga: '',
                    caption: '',
                    berat: ''
                };
                this.fotoProduk = []
                alert('Produk berhasil di tambahkan!')
            } else {
                alert('Terjadi kesalahan!')
            }
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
    onProcess() {
        // console.log(e)
        console.log('uploading...')
    }
  },
  created() {
      this.authenticationEndpoint = this.$api + '/Upload'
  },
  beforeCreate() {
      if(this.$store.getters.getLoginStatus == false) {
          alert('Anda belum login!')
          this.$router.push('/p/login')
      }      
  }   
}
</script>
