Vue.component('basket', {
    data(){
        return {
            basket: [],
            imgCart: 'https://placehold.it/50x100',
            showCart: false
        }
    },
    methods: {
        handleBuyClick(item) {
            // проверяет есть ли в корзине этот товар
            for (let i = 0; i < this.basket.length; i++) {
                if (this.basket[i].id === item.id) {
                    //если есть добавляет количество товара
                    return this.addQuantityAdd(item.id, i);
                }
            }
            //если нет добавляет товар в корзину
            let prod = Object.assign({quantity: 1}, item);
            this.basket.push(prod);
            return fetch(`cart`, {
                method: 'POST',
                body: JSON.stringify(prod),
                headers: {
                    'Content-type': 'application/json',
                },
            })
        },
        addQuantityAdd(id, i){
            this.basket[i].quantity++;
            this.updateQuantityServer(id, i);
        },
        addQuantityDiminish(id){
            for (let i = 0; i < this.basket.length; i++) {
                if (this.basket[i].id === id) {
                    if (this.basket[i].quantity > 1) {
                        this.basket[i].quantity--;
                        this.updateQuantityServer(id, i);
                        return false
                    } else if (confirm('Вы действительно хотите удалить товар из корзины?')) {
                        return this.handleDeleteClick(id);
                    } else {
                        return false;
                    }
                }
            }
        },
        //обновляет количество товара на сервере
        updateQuantityServer(id, i){
            return fetch(`/cart/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({quantity: this.basket[i].quantity}),
                headers: {
                    'Content-type': 'application/json',
                },
            })
        },
        //удаляет товар с сервера
        handleDeleteClick(id) {
            return fetch(`/cart/${id}`, {
                method: 'DELETE',}).then(() => {
                this.basket = this.basket.filter((item) => item.id !== id);
            });
        },

        quantityItemBasket(){
            return this.basket.length
        },
    },
    mounted(){
        this.$parent.getJson('/cart')
            .then((goods) => {
                this.basket = goods;
            });
    },
    computed: {
        total() {
            return this.basket.reduce((acc, item) => acc + item.quantity * item.price, 0);
        }
    },
    template:`
        <div class="basket">
        <div id="btn" class="btn">
        <button class="btn_cart button" @click="showCart = !showCart" type="button">Корзина</button>
        <div v-if="quantityItemBasket() > 0" class="btn_cart_out flex">{{ quantityItemBasket() }}</div>
    </div>
            <div class="basket-block" v-show="showCart" >
                <p v-if="!basket.length">Корзина пуста</p>
                <basket-item class="basket-item"
                    v-for="item of basket"
                    :key="item.id"
                    :cart="item"
                    :img="imgCart"
                    @handle-buy-click="handleBuyClick"
                    @add-quantity-diminish="addQuantityDiminish"
                    @handle-delete-click="handleDeleteClick"
                    >
                </basket-item>
                <p v-if="basket.length">Общая стоимость: {{ total }}р</p>
            </div>
        </div>
`
});

Vue.component('basket-item', {
    props: ['cart', 'img'],
    template: `
    <div  class="basket-item flex bxbb">
        <img class="basket-item_img"  :src="img" alt="photo">
        <div class="basket-item_text">
        <h3  class="basket-item_text_h3">{{ cart.title }}</h3>
        <p class="basket-item_text_p">{{ cart.quantity }}товаров по {{ cart.price }}р</p>
        <button class="button basket-item_button" @click="$emit('handle-buy-click', cart)"
                type="button">+</button>
        <button class="button basket-item_button" @click="$emit('add-quantity-diminish', cart.id)"
                type="button">-</button>
        <button class="button basket-item_button basket-item_button_delete"
                @click="$emit('handle-delete-click', cart.id)" type="button">&times;</button>
        </div>
    </div>
    `
});
