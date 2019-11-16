Vue.component('error', {
    data(){
        return {
            text: ''
        }
    },
    methods: {
        setError(text){
            this.text = text;
        }
    },
    template: `
    <div class="error-block" v-if="text">
        <p class="error-message">
        <button class="error-button button" @click="setError('')"></button>
            {{ text }}
        </p>
    </div>
    `

});