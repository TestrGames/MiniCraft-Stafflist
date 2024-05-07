const app = Vue.createApp({
    data() {
        return {
            data: []
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
            const date = new Date(timestamp);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const timeString = `${hours}:${minutes}`;
            const dateString = `${day}.${month}.${year}`;
            return { time: timeString, date: dateString };
        }
    },
    async mounted() {
        try {
            const req = await axios.get("https://api.testrgames.com/v1/minicraftcz/staff");
            const { data } = req;
            // Check if admin and login properties exist for each user before converting timestamp
            data.forEach(user => {
                if (user.login) {
                    user.login = this.convertTimestamp(user.login);
                }
            });
            this.data = data;
        } catch (error) {
            console.error('Error fetching data:', error);
            this.data = [];
        }
    }
});
app.mount('#app');
