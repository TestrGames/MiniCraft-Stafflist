const app = Vue.createApp({
    data() {
        return {
            data: [],
            errorMessage: '' 
        }
    },
    methods: {
        getRow(users) {
            const arr = [];
            let _ = [];
            for (let i = 0; i < users.length; i++) {
                _.push(users[i]);
                if (i % 3 === 2) {
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
                return { date: "Kdo ví" };
            } else {
                // Převod blbyho timestampu na normlani cas rr
                const date = new Date(parseInt(timestamp));
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const timeString = `${hours}:${minutes}`;
                const dateString = `${day}.${month}.${year}`;
                return { time: timeString, date: dateString };                
            }
        }
    },
    async mounted() {
        try {
            const req = await axios.get("https://api.testrgames.com/v1/minicraftcz/staff");
            const { data } = req;
            data.forEach(team => {
                team.groups.forEach(group => {
                    group.users.forEach(user => {
                        user.login = this.convertTimestamp(user.login);
                        if (user.lastJoined) {
                            user.lastJoined = this.convertTimestamp(user.lastJoined);
                        }
                        // ZOBRAZENI DOVOLENY
                        if (user.holiday) {
                            user.status = 'Dovolená';
                        } else {
                            user.status = user.online ? 'Aktivní' : 'Offline';
                        }
                    });
                });
            });
            this.data = data;
        } catch (error) {
            console.error('Error fetching data:', error);
            this.errorMessage = 'Nastala chyba při načítání dat. Kontaktuj nás prosím na discordu.';
            this.data = [];
        }
    }
});
app.mount('#app');
