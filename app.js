const app = Vue.createApp({
    data() {
        return {
            data: [],
            errorMessage: '' // Nová proměnná pro zobrazení chybové zprávy
        }
    },
    methods: {
        getRow(users) {
            const arr = [];
            let _ = [];
            for (let i = 0; i < users.length; i++) {
                _.push(users[i]);
                if (i % 3 == 2) {
                    arr.push(_);
                    _ = [];
                }
            }
            if (_.length > 0) arr.push(_);
            return arr;
        },
        open(name) {
            window.open(`https://www.minicraft.cz/profile/${name}`);
        },
        convertTimestamp(timestamp) {
            if (timestamp === 0) {
                return { date: "Kdo vi" };
            } else {
                const date = moment(timestamp);
                const timeString = date.format('HH:mm');
                const dateString = date.format('DD.MM.YYYY');
                return { time: timeString, date: dateString };                
            }
        }
    },
    async mounted() {
        try {
            const req = await axios.get("https://api.testrgames.com/v1/minicraftcz/staff");
            const { data } = req;
            data.forEach(user => {
                if (user.login) {
                    user.login = this.convertTimestamp(user.login);
                }
                if (user.lastJoined) {
                    user.lastJoined = this.convertTimestamp(user.lastJoined);
                }
            });
            this.data = data;
        } catch (error) {
            console.error('Error fetching data:', error);
            this.errorMessage = 'Nastala chyba při načítání dat. Kontaktuj nás prosím na discordu.'; // Nastavení chybové zprávy
            this.data = [];
        }
    }
});
app.mount('#app');
