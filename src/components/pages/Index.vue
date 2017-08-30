<template>
    <div>
        <button @click="logOut()">Выйти</button>
        <select v-model="size">
            <option v-for="size in arrSize" :width="size.width" :height="size.height">{{size.width}}x{{size.height}}</option>
        </select>
        <div>
            <label for="counts">Кол-во фото</label>
            <input id="counts" v-model="count" type="number" min="1"/>
        </div>
        <button @click="calcPrice()">Go</button>

        <p v-if="price">Цена: {{ price | ruble }}</p>

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
                count: 4,
                size: '',
                price: 0,
                errorMessages: []
            }
        },
        created: function () {
            this.$http({
                method: 'get',
                url: 'photo/size'
            }).then(response => {
                this.arrSize = response.data.response;
                this.size = this.arrSize[0].width + 'x' + this.arrSize[0].height;
            }).catch(error => {
                alert(error)
            });
        },
        watch: {
            size: {
                handler() {
                    this.price = 0;
                    this.errorMessages.splice(0);
                },
                deep: true
            },
            count: {
                handler() {
                    this.price = 0;
                    this.errorMessages.splice(0);
                },
                deep: true
            }
        },
        methods: {
            logOut() {
                localStorage.removeItem('token');
                this.$router.push('/login');
            },
            calcPrice() {
                this.$http.get('photo/price', {
                    params: {
                        width: this.selectedSize.width,
                        height: this.selectedSize.height,
                        count: this.count
                    }
                }).then(response => {
                    this.price = response.data.response;
                }).catch(error => {
                    this.errorMessages = JSON.parse(error.request.responseText).message;
                })
            }
        },
        computed: {
            selectedSize: function () {
                const sizes = this.size.split('x');

                return { width: sizes[0], height: sizes[1] };
            }
        },
        filters: {
            ruble: value => value + 'р.'
        }
    }
</script>