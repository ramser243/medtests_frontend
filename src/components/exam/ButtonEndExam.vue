<template>
    <button class="btn btn-exam" @click="endExam">Завершить экзамен</button>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ButtonEndExam",
        methods: {
            endExam() {
                this.$store.dispatch('setStoreVariantOfTesting', 'exam_end')
                this.$store.dispatch('setStoreCountCorrectAnswers')
                this.$router.push('/exam_end')
            }
        },
        computed: {
            ...mapGetters(['get_active_question', 'get_active_theme', 'get_dict_for_test', 'get_variant_of_testing'])
        }
    }
</script>

<style scoped>

</style>