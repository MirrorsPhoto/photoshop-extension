<template>
    <div>
        <button @click="logOut()">Выйти</button>

        <select v-model="photoParams.size">
            <option v-for="size in arrSize" :value="size">{{size.width}}x{{size.height}}</option>
        </select>

        <label>Кол-во фото<br>
            <select @change="photoParams.count = $event.target.value" :disabled="disabled">
                <option v-for="count in photoParams.size.count">{{ count }}</option>
            </select>
        </label>

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
    watch: {
        'photoParams.size.count'(arr) {
            this.photoParams.count = arr[0]
        }
    },
    computed: {
        disabled() {
            const arrCount = this.photoParams.size.count;
            return arrCount ? arrCount.length === 1 : false;
        }
    },
    methods: {
        render() {
            (new CSInterface).evalScript('render(' + this.photoParams.size.width + ', ' + this.photoParams.size.height + ', ' + this.photoParams.count + ')');

            this.$socket.send(JSON.stringify({
              height: this.photoParams.size.height,
              width: this.photoParams.size.width,
              count: this.photoParams.count
            }))
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