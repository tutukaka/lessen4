Vue.component('catalog', {
    data(){
        return {
            items: [],
            filteredItems: [],
            query: '',
            imgCatalog: 'https://placehold.it/200x150',
            count: 0
        }
    },
    methods: {
        handleSearchClick() {
            this.filteredItems = this.items.filter((item) => {
                const regexp = new RegExp(this.query, 'i');
                return regexp.test(item.title);
            });
        },

    },
    mounted(){
        this.$parent.getJson('/goods')
            .then((goods) => {
                this.items = goods;
                this.filteredItems = goods;
            });
    },
    template: `
    <div>
        <div class="root">
        <h2 class="root__header">Каталог</h2>
        <form class="root__search flex" action="#">
           <input class="root__search_input" type="text" 
           placeholder="Введите название товара" v-on:keyup.enter="handleSearchClick" v-model="query">
           <button class="button root__search_button" type="button" 
           @click="handleSearchClick">Найти</button>
        </form>
        </div>
        <div id="catalog" class="catalog container flex bxbb">
            <p v-if="filteredItems.length === 0">Ничего не найдено</p>
                <catalog-item  v-for="item in filteredItems" 
                :key="item.id"
                :item="item"
                :img="imgCatalog"
                ></catalog-item>
        </div>
    </div>
    `
});


Vue.component('catalog-item', {
    props: ['item', 'img'],
    methods:{
      test(item){
          this.$root.$refs.basket.handleBuyClick(item)
      }
    },
    template: `
         <div  class="catalog__item bxbb">
            <img class="catalog__item_img" :src="img" alt="photo">
            <h3 class="catalog__item_text_h3">{{ item.title }}</h3>
            <p class="catalog__item_text_p">цена: {{ item.price }}р</p>
            <button @click="test(item)" class="button catalog__item_button"
                type="button">добавить</button>
         </div>
    `
});