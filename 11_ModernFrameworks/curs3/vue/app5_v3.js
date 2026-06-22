const { createApp } = Vue;
let vm = createApp({
    data() {
        return {
            name: '',
            confirmed: false,
            tableNumber: '',
            message: '',
            allergies: [],
            guests: [],
            errors: []
        }
    },
    methods: {
        isValid: function (name, tableNumber, message) {
            this.errors = []
            if (name === '') {
                this.errors.push("Va rugam sa introduceti numele!")
            } else if (name.length > 20 || name.length <= 2) {
                this.errors.push("Numele introdus nu este complet!")
            }

            if (tableNumber === '') {
                this.errors.push("Va rugam sa va alegeti masa!")
            }
            if (message.length > 100) {
                this.errors.push("Va rugam sa scrieti un mesaj scurt!")
            }
            if (this.errors.length > 0) {
                return false
            } else {
                return true
            }
        },
        addGuest: function () {

            if (this.isValid(this.name, this.tableNumber, this.message)) {

                console.log(`Invitat adaugat ${this.name} ${this.confirmed} ${this.tableNumber} ${this.allergies}`)
                let guest = {
                    name: this.name,
                    confirmed: this.confirmed,
                    tableNumber: this.tableNumber,
                    message: this.message,
                    allergies: this.allergies
                }
                this.guests.push(guest)

                this.name = ''
                this.confirmed = false
                this.tableNumber = ''
                this.message = ''
                this.allergies = []

            } else {
                console.log(this.errors)

                console.log("Camp necompletat!")
            }
        }
    },
    computed: {
        characterCount() {
            return this.message.length;
        }
    }
}).mount('#app');
