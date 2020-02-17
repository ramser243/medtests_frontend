<template>
    <ul onmousedown="return false" onselectstart="return false">
        <AnswerForTeaching
                v-for="(answer_object, index) in get_active_theme['questions'][get_active_question - 1]['answers']"
                :name="answer_object['name']"
                :number="index"
                :key="index"/>
        <span v-if="this.get_true_dict_for_exam[question_number].toString() == this.get_dict_for_test[question_number].toString() && this.$route.path == '/teaching'" class="glyphicon glyphicon-ok" style="color: green" aria-hidden="true"> Правильно</span>
    </ul>
</template>

<script>
    import {mapGetters} from 'vuex'
    import AnswerForTeaching from "./AnswerForTeaching";

    export default {
        name: "UlForTeaching",
        components: {AnswerForTeaching},
        props: ['question_number'],
        computed: {
            ...mapGetters(['get_active_question', 'get_active_theme', 'get_dict_for_test', 'get_true_dict_for_exam'])
        }
    }
</script>

<style scoped>

</style>