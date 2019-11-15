new Vue({
   el: '#all',
    data: {


    }
});

Vue.component('catalog', {
    data(){
        return {
            items: [],
            filteredItems: [],
            userSerch: '',
        }
    },
    metods: {

    },
    mounted(){

    },
    template: `
    
    `
});
Vue.component('catalog-item', {
    data(){
        return
    },
    metods: {

    },
    mounted(){

    },
    template: `
    
    `
});



Vue.component('basket', {
    data(){
        return
    },
    metods: {

    },
    mounted(){

    },
    template:` 
        <div class="basket">
            <button class="basket-button" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="basket-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <basket-item class="basket-item"
                    v-for="item of cartItems"
                    :key="item.id_product"
                    :cart-item="item"
                    :img="imgCart"
                    @remove="remove">
                </basket-item>
            </div>
        </div>
`
});

Vue.component('basket-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="basket-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});
