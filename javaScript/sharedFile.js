/*
сервер запусккается в Node js  из терминала редактора
при помощи команд
json-server --watch db.json --port 3012 --static ./
*/

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
                    // this.$refs.error.setError(error);
                })
        },
    },
});


