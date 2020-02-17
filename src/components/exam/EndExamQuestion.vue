<template>
    <div class="end-exam-question-row" data-toggle="collapse" v-bind:data-target="'#question' + this.question_number" v-bind:aria-controls="'question' + this.question_number" aria-expanded="false">
        <div class="exam-end-question-header">
            {{get_active_theme['questions'][question_number-1]['name']}}
        </div>
        <span v-bind:class="{'bg-success' : (get_true_dict_for_exam[question_number].toString() == get_dict_for_test[question_number].toString()), 'bg-danger' : !(get_true_dict_for_exam[question_number].toString() == get_dict_for_test[question_number].toString())}">
        </span>
        <div class="collapse" :id="'question' + this.question_number">
            <UlForExamEnd :question_number="this.question_number"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import UlForExamEnd from "./UlForExamEnd";

    export default {
        name: "EndExamQuestion",
        components: {UlForExamEnd},
        props: ['question_number'],
        computed: {
            ...mapGetters(['get_time_of_exam', 'get_true_dict_for_exam', 'get_dict_for_test', 'get_active_theme'])
        },
    }
</script>

<style scoped>

</style>