import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default {
    state: {
        cartItem: [],
        total: 0
    },
    getters: {
        cartSize: (state) => {
            return state.cartItem.length;
        },
        getCart: (state) => {
            return state.cartItem;
        },
        cartTotalAmount: (state) => {
            return state.cartItem.reduce((total, product) => {
                return total + (product.HARGA * product.quantity);
            }, 0);
        },
        toast: (state) => {
            return state.toast;
        }
    },
    mutations: {

        resetCart: (state) => {
            state.cartItem = []
            state.total = 0
        },
        
        setUpProducts: (state, productsPayload) => {
            //sets the state's  products property to the products array recieved as payload
            state.products = productsPayload;
        },
        addToCart: (state, itemProduct) => {
            console.log(itemProduct.NAMA_PRODUK)
            let found = state.cartItem.find(product => product.ID == itemProduct.ID)
            console.log(found)
            if(found) {
                // found.quantity++
                let satu = itemProduct.quantity * parseInt(itemProduct.HARGA);
                state.total = state.total + satu;
                found.quantity = itemProduct.quantity
            } else {
                let satu = itemProduct.quantity * parseInt(itemProduct.HARGA);
                state.total = state.total + satu;
                state.cartItem.push(itemProduct)
                // new Vue(itemProduct, 'totalPrice', itemProduct.quantity * parseInt(itemProduct.HARGA));
            }
        },
        removeFromCart: (state, productId) => {
            //find the product in the products list
            let product = state.cartItem.find((product) => product.ID === productId);
            product.quantity--;
            state.total = product.quantity * parseInt(product.HARGA)
            if(product.quantity <= 0) {
                let cartProductIndex = state.cartItem.findIndex((product) => product.ID === productId);                
                state.cartItem.splice(cartProductIndex, 1);
            }
        },
        deleteFromCart: (state, productId) => {
            let cartProductIndex = state.cartItem.findIndex((product) => product.ID === productId);
            state.cartItem.splice(cartProductIndex, 1);
        },
        showToast: (state, toastText) => {
            state.toast.show = true;
            state.toast.text = toastText;
        },
        hideToast: (state) => {
            state.toast.show = false;
            state.toast.text = "";
        }
    },
    actions: {
        fetchProducts: ({ commit }) => {
            //simulating a fake ajax request to fetch products from database
            myApi.getProducts().then((products) => {
                //passing the products recieved from response as a payload to the mutation
                commit("setUpProducts", products);
                commit("showToast", "products loaded");
            });
        },
        addToCart: ({ commit }, productId) => {
            myApi.products("add", productId).then((productId) => {
                commit("addToCart", productId);
                commit("showToast", "added to cart");
            });
        },
        removeFromCart: ({ commit }, productId) => {
            myApi.products("remove", productId).then((productId) => {
                commit("removeFromCart", productId);
                commit("showToast", "removed from cart");
            });
        },
        deleteFromCart: ({ commit }, productId) => {
            myApi.products("delete", productId).then((productId) => {
                commit("deleteFromCart", productId);
                commit("showToast", "deleted from cart");
            });

        }
    }
};