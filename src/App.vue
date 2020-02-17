<template>
    <div>
        <div class="main_block"
             v-bind:class="{'position-fixed' : ['/exam', '/teaching', '/show_answers', '/action_choice'].includes(this.$route.path)}">
            <Loader v-if="get_loading"/>
            <NavigateBar v-if="this.$route.path != '/'"/>
            <div class="turn_screen">переверни экран</div>
            <router-view/>
        </div>
        <Modal :buttonText="'Перейти'" :headerText="'Перейти к вопросу'" :modalId="'go-to-question-number-modal'"/>
        <Modal :buttonText="'Перейти'" :headerText="'Перейти к другому варианту обучения'" :modalId="'change-variant-of-testing-modal'"/>
        <Modal :buttonText="null" :headerText="'Навигация по сайту'" :modalId="'open-menu-modal'"/>
        <Modal :buttonText="'Отправить жалобу'" :headerText="'Внести поправку в тесты'" :modalId="'open-abuse-modal'"/>
        <Modal :buttonText="null" :headerText="'Поиск по вопросам'" :modalId="'open-search-by-name-results-modal'"/>
    </div>
</template>

<script>
    import NavigateBar from './components/NavigateBar'
    import {mapGetters} from 'vuex'
    import Loader from "./components/Loader";
    import Modal from "./components/Modal";

    export default {
        name: "App",
        components: {Modal, Loader, NavigateBar},
        computed: {
            ...mapGetters(['get_loading'])
        },
        mounted() {
            $('body').css({'background' : 'none', 'background-color' : '#4a4745'})
        }
    };
</script>
<style lang="scss">
    @import './scss/main';
</style>