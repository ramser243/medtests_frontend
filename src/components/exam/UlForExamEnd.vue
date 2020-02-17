<template>
    <ul class="exam-end-ul" onmousedown="return false" onselectstart="return false">
        <AnswerForExamEnd
                v-for="(answer_object, index) in this.get_active_theme['questions'][this.question_number - 1]['answers']"
                :name="answer_object['name']"
                :question_number="question_number"
                :answer_number="answer_object['in_question_id']"
                :key="index"/>
    </ul>
</template>

<script>
    import {mapGetters} from 'vuex'
    import AnswerForExamEnd from "./AnswerForExamEnd";

    export default {
        name: "UlForExamEnd",
        components: {AnswerForExamEnd},
        props: ['question_number'],
        computed: {
            ...mapGetters(['get_true_dict_for_exam', 'get_dict_for_test', 'get_active_theme', 'get_active_question'])
        },
    }
</script>

<style scoped>
    .exam-end-ul{
        list-style: none;
    }
</style>