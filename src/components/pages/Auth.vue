<template>
    <div class="bg" ref="parallax" @mousemove="move($event)">
        <form :class="{ error: errorMessages.length > 0 }" @submit.prevent="auth()">
            <field
                    placeholder="Логин"
                    v-model="user.login"
                    autofocus
            ></field>
            <field
                    placeholder="Пароль"
                    type="password"
                    v-model="user.password"
            ></field>
            <input type="submit">

            <p>
                <span v-for="message in errorMessages" :key="message">{{ message }}<br></span>
            </p>
        </form>
    </div>
</template>

<script>
    import field from '../UI/field.vue';

    export default {
        data() {
            return {
                user: {
                    login: '',
                    password: ''
                },
                errorMessages: []
            }
        },
        watch: {
            user: {
                handler() {
                    this.errorMessages.splice(0);
                },
                deep: true
            }
        },
        methods: {
            move(e) {
                const
                    movementStrength = 25,
                    height = movementStrength / window.screen.height,
                    width = movementStrength / window.screen.width,
                    pageX = e.pageX - (window.screen.width / 2),
                    pageY = e.pageY - (window.screen.height / 2),
                    newvalueX = width * pageX * -1 - 25,
                    newvalueY = height * pageY * -1 - 50;

                this.$refs.parallax.style.backgroundPosition = newvalueX + "px " + newvalueY + "px";
            },
            auth() {
                const { login, password } = this.user;

                if (login && password) {
                    this.$http({
                        method: 'post',
                        url: 'login',
                        data: { login, password }
                    }).then(response => {
                        const token = response.data.response.token;
                        localStorage.setItem('token', token);
                        this.$router.push('/');
                    }).catch(error => {
                        this.errorMessages = JSON.parse(error.request.responseText).message;
                    });
                }
                else this.errorMessages.splice(0, 1, 'Заполните все поля формы');
            }
        },
        components: {
            field
        },
        beforeRouteEnter(to, from, next) {
            const token = localStorage.getItem('token');
            (token) ? next({ path: '/' }) : next();
        }
    }
</script>

<style lang="sass">
    @import '../../styles_config.sass'

    .bg
        height: 100vh
        display: flex
        align-items: center
        justify-content: center

    form
        width: 350px
        padding: 50px 50px 70px
        position: relative
        color: #fff
        background: #fff
        box-shadow: 1px 5px 10px rgba(0, 0, 0, .2)

        & img
            width: 350px
            display: block
            margin: 0 -50px

        & div
            margin-top: 25px

        & [type="submit"]
            display: none

        & p
            text-align: center
            position: absolute
            left: 0
            right: 0
            top: 200px
            color: $primary-color

            & span
                color: inherit

        &.error
            animation: shake 0.2s ease-in-out 0s 2


    @keyframes shake
        0%
            margin-left: 0rem
        25%
            margin-left: 0.5rem
        75%
            margin-left: -0.5rem
        100%
            margin-left: 0rem


</style>