Vue.component('filtered', {
   data(){
       return {
           query: ''
       }
   },
    methods:{
        filterQuery(value){
            this.$root.$refs.catalog.handleSearchClick(value)
        }
    },
    template: `
    <form class="root__search flex" action="#">
       <input class="root__search_input" type="text" 
       placeholder="Введите название товара" v-on:keyup.enter="filterQuery(query)" v-model="query">
       <button class="button root__search_button" type="button" 
       @click="filterQuery(query)">Найти</button>
    </form>
    `
});