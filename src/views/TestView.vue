<template>
    <div>
        <b-button @click="insertDB()" size="is-large" style="background-color: #ff697b; color: white; border: 1px solid #CCC;" expanded>Insert Database.</b-button>
    </div>
</template>
<script>
import { db } from '../model/db'

export default {
    methods: {
      insertDB: function() {
            console.log('tes')
            firebase.auth().signInAnonymously().catch(function(error) {
                // Handle Errors here.
                console.log(error)
            });

/*             db.collection('igtokoUser').add({
                "USERNAME": "SusuJaheMerah",
                "COVER_IMAGE": "https://ik.imagekit.io/igtoko/igtoko_RnzZo8lg2X.jpg",
                "LONGITUDE": "107.56052197007439",
                "LATITUDE": "-6.99440255883324",
                "ALAMAT": "Jual Susu Jahe Merah"
            })    */       
      },        
    }    
}
</script>