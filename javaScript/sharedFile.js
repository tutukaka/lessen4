

const app = new Vue({
   el: '#app',
    data: {
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

    },
    mounted(){
        console.log('root', this)
    }
});


