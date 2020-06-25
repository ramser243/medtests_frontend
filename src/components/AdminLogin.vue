<template>
    <div class="container">
        <div class="row">
            <form @submit.prevent="login_form">
                <h1>Логин для Администратора</h1>
                <div><input type="text" v-model="login" autocomplete="nope" placeholder="логин"></div>
                <div><input type="password" v-model="password" autocomplete="new-password" placeholder="пароль"></div>
                <hr/>
                <button type="submit">Вход</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "AdminLogin",
        computed: {
            ...mapGetters(['get_active_question', 'get_active_theme'])
        },
        methods: {
            login_form() {
                this.$store.dispatch('loginAdmin', [this.login, this.password])
                this.$router.push("/themes")
            }
        },
        data: function () {
            return {
                login: '',
                password: ''
            }
        }
    }
</script>

<style scoped>

</style>