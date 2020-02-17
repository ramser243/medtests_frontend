<template>
    <li v-bind:class="{'text-primary' : get_dict_for_test[question_number][answer_number-1]}">
        <p>
            <span v-if="get_true_dict_for_exam[question_number][answer_number-1]" class="glyphicon glyphicon-ok" style="color: green" aria-hidden="true"></span>
            <span v-if="!get_true_dict_for_exam[question_number][answer_number-1]" class="glyphicon glyphicon-remove" style="color: red" aria-hidden="true"></span>
            {{answersText}}
        </p>

    </li>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "AnswerForExamEnd",
        props: ['answer_number', 'question_number'],
        computed: {
            ...mapGetters(['get_dict_for_test', 'get_active_question', 'get_active_theme', 'get_true_dict_for_exam']),
            answersText() {
                if (this.get_active_theme['questions'][this.question_number-1]['answers'][this.answer_number-1]) {
                    return this.get_active_theme['questions'][this.question_number-1]['answers'][this.answer_number-1]['name']
                }
            }
        },
    }
</script>

<style scoped>

</style>