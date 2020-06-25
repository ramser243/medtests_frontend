<template>
    <div class="block-container choice">
        <ChoiceBlock
                @click.native="showAnswers"
                :text="'Тесты с ответами'"/>
        <ChoiceBlock
                @click.native="teaching"
                :text="'Обучение'"/>
        <ChoiceBlock
                @click.native="exam"
                :text="'Экзамен'"/>
        <ChoiceBlock v-if="is_admin"
                @click.native="showAnswers"
                :text="'Редактор'"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ChoiceBlock from "./ChoiceBlock";

    export default {
        name: "ActionChoice",
        components: {ChoiceBlock},
        methods: {
            exam() {
                this.$store.dispatch('setStoreActiveTheme', ['exam', this.get_active_theme_id])
                this.$store.dispatch('setStoreActiveQuestion', 1)
                this.$store.dispatch('setStoreVariantOfTesting', 'exam')
                this.$router.push('/exam')
            },
            showAnswers() {
                this.$store.dispatch('setStoreActiveTheme', ['test', this.get_active_theme_id])
                this.$store.dispatch('setStoreActiveQuestion', 1)
                this.$store.dispatch('setStoreVariantOfTesting', 'showAnswers')
                this.$router.push('/show_answers')
            },
            teaching() {
                this.$store.dispatch('setStoreActiveTheme', ['test', this.get_active_theme_id])
                this.$store.dispatch('setStoreActiveQuestion', 1)
                this.$store.dispatch('setStoreVariantOfTesting', 'teaching')
                this.$router.push('/teaching')
            },
        },
        computed: {
            ...mapGetters(['is_admin', 'get_active_theme', 'get_active_question', 'get_active_theme_id'])
        },
    }
</script>

<style scoped>

</style>