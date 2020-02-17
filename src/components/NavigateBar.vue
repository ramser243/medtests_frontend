<template>
    <div class="sticky-top">
        <nav class="navigate">
             <form v-if="this.$route.path == '/themes'" class="mx-auto input-group col-9 col-md-8 col-lg-6"
                  @submit.prevent="Search" id="theme-search-form">
                <input id="theme-search-input" class="form-control" type="search" placeholder="Найти тему..."
                       v-model="inputText" @keyup="Search">
                <div class="input-group-append">
                    <button class="btn btn-clear" type="button" @click="clearInputText">&times;</button>
                </div>
                <div class="input-group-append">
                    <button class="btn btn-u" type="submit">Поиск</button>
                </div>
            </form>
            <div v-if="this.$route.path != '/themes'" class="nav-theme-choiced">
                <button @click="goBack" class="btn text-light">
                    <ArrowLeftShort/>
                </button>
                <p>{{this.get_active_theme_name}}</p>
                <button @click="menuOpen" class="btn text-light">
                    <MenuIcon/>
                </button>
            </div>
        </nav>
        <Crumbs v-if="['/exam', '/teaching', '/show_answers'].includes(this.$route.path)"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Crumbs from "./Crumbs";
    import ArrowLeftShort from "./icons/ArrowLeftShort";
    import XCircle from "./icons/XCircle";
    import MenuIcon from "./icons/MenuIcon";

    export default {
        name: "NavigateBar",
        components: {MenuIcon, XCircle, ArrowLeftShort, Crumbs},
        data() {
            return {
                inputText: '',
                mins: 29,
                secs: 59,
                time_left: 1800
            }
        },
        methods: {
            goBack() {
                // when user return to theme search
                if (this.$route.path == '/action_choice') {
                    this.clearInputText()
                    this.$router.push('/themes')
                } else if (['/exam', '/teaching', '/show_answers', '/exam_end'].includes(this.$route.path)) {
                    this.$router.push('/action_choice')
                    this.$store.dispatch('setStoreClearDictForTest')
                    this.$store.dispatch('setStoreActiveQuestion', false)
                }
            },
            menuOpen() {
                $('#open-menu-modal').modal('show')
            },
            Search() {
                if (this.inputText == 'салам') {
                    location.href = 'https://vk.com/id385610795'
                }
                else if (this.inputText == 'шрек') {
                    location.href = 'https://vk.com/ebukin99999'
                }
                this.$store.dispatch('setStoreThemeNamePart', this.inputText)
            },
            clearInputText() {
                this.inputText = ''
                this.Search()
            }
        },
        computed: {
            ...mapGetters(['get_active_theme', 'get_active_question', 'get_variant_of_testing', 'get_loading', 'get_active_theme_name']),
        },
        updated() {
            if (this.$route.path != '/themes') {
                this.inputText = ''
                this.Search()
            }
        },
mounted() {
            if (!this.get_active_theme) {
                this.$router.push('/themes')
            }
        }
    }
</script>

<style scoped>

</style>