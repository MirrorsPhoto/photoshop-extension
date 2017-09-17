<template>
    <div>
        <button @click="logOut()">Выйти</button>
        <select v-model="photoParams.size">
            <option v-for="size in arrSize" :value="size">{{size.width}}x{{size.height}}</option>
        </select>
        <div>
            <label for="count">Кол-во фото</label>
            <input id="count" v-model="photoParams.count" type="number" min="1"/>
        </div>

        <button @click="render()">Go</button>

        <p>
            <span v-for="message in errorMessages" :key="message">{{ message }}<br></span>
        </p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                arrSize: [],
                photoParams: {
                    count: 4,
                    size: {}
                },
                price: 0,
                errorMessages: []
            }
        },
        methods: {
            render() {
                (new CSInterface).evalScript('render(' + this.photoParams.size.width + ', ' + this.photoParams.size.height + ', ' + this.photoParams.count + ')');
            },
            logOut() {
                localStorage.removeItem('token');
                this.$router.push('/login');
            }
        },
        filters: {
            ruble: value => value + '₽'
        },
        created() {
            this.$http({
                method: 'get',
                url: 'photo/size'
            }).then(response => {
                this.arrSize = response.data.response;
                this.photoParams.size = this.arrSize[0];
            }).catch(error => {
                alert(error);
            });
        },
    }
</script>