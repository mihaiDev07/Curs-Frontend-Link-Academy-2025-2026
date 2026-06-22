
const vm = Vue.createApp({
    data() {
        return {
            fname: "Ion",
            lname: "Popescu",
            address: "Brasov",
            message: "Imi place JavaScript"
        }

    },
    methods: {
        myName: function () {
            return "Eu ma numesc " + this.fname + " " + this.lname + " si sunt din " + this.address;
        }
    }
}).mount('#app');
const app = Vue.createApp({
    data() {
        return {
            seen: true,
            limbaje: [
                { id: 1, text: 'JavaScript' },
                { id: 2, text: 'Java' },
                { id: 3, text: 'PHP' }
            ],
            htmlcontent: "<div><h3>Vue Js este interesant!</h3></div>"
        }
    },

}).mount('#app2');