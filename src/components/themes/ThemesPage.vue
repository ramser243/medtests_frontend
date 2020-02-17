<template>
    <div class="block-container">
        <ThemeTile
                @click.native="themeSelect(i)"
                v-if="!get_loading && (name.toLowerCase().indexOf(get_theme_name_part.toLowerCase()) != -1)"
                v-for="(name, i) in get_themes"
                :name="name[0].toUpperCase() + name.slice(1, )"
                :key="i"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ThemeTile from "./ThemeTile";
    import Loader from "../Loader";

    export default {
        name: "ThemesPage",
        beforeCreate: function () {
            this.$store.dispatch('setStoreThemes')
        },
        computed: {
            ...mapGetters(['get_themes', 'get_loading', 'get_active_theme', 'get_theme_name_part']),
        },
        components: {ThemeTile},
        methods: {
            themeSelect(theme_number) {
                this.$store.dispatch('setStoreActiveThemeId', theme_number + 1)
                this.$router.push('/action_choice')
            }
        }
    }
</script>

<style scoped>

</style>