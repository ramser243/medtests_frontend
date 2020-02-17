<template>
    <button class="btn btn-u btn-previous w-100" @click="previousQuestion"><span class="glyphicon glyphicon-arrow-left"></span></button>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ButtonPrevious",
        methods: {
            previousQuestion() {
                if (this.get_active_question == 1) {
                    this.$store.dispatch('setStoreActiveQuestion', this.get_active_theme['questions_amount'])
                } else {
                    this.$store.dispatch('setStoreActiveQuestion', this.get_active_question - 1)
                }
                if (!(this.get_active_question in this.get_dict_for_test)) {
                    this.$store.dispatch('setStoreNewQuestionToTeaching', [this.get_active_question, new Array])
                }
            }
        },
        computed: {
            ...mapGetters(['get_active_question', 'get_active_theme', 'get_dict_for_test'])
        }
    }
</script>

<style scoped>

</style>