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
            for(let i = 0; i < users.length; i++) {
                _.push(users[i]);
                if(i % 3 == 2) {
                    arr.push(_);
                    _ = [];
                }
            }
            if(_.length > 0) arr.push(_);
            return arr;
        },
        open(name) {
            window.open(`https://www.minicraft.cz/profile/${name}`);
        }
    },
    async mounted () {
        const req = await axios.get("https://demo.lishak.eu/api/data");
        const { data } = await req;
        this.data = data;
    }
});
app.mount('#app');