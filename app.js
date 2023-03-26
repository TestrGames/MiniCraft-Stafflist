const app = Vue.createApp({
    data() {
        return {
            admins: [],
            groups: [],
            filterNick: ''
        }
    },
    methods: {
        getAdminsByGroup(group) {
            return this.admins.filter(a => a.group == group);
        }
    },
    async mounted () {
        const req = await fetch("http://194.163.177.12:27001/all");
        const { value } = await req.json();

        let arr = value.map(q => q.groups);
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            let r = el.map(q => q.users);
            
            for (let j = 0; j < r.length; j++) {
                const el2 = r[j];
                this.admins.push(...el2);
            }
        }

        let arr2 = [];
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            arr2.push(...el);
        }
        this.groups = arr2.map(q => q.name);
    }
});
app.mount('#app');