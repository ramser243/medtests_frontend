<template>
    <div class="question-search-by-name-result-block" v-if="(get_active_theme['questions'][this.question_number]['name'].toLowerCase().indexOf(get_question_name_part.toLowerCase()) != -1) && (get_question_name_part != '')" data-toggle="collapse" v-bind:data-target="'#question-search-by-name' + this.question_number" v-bind:aria-controls="'question-search-by-name' + this.question_number" aria-expanded="false">
        <p class="search-result-header">
            {{this.nameChangedStart}}<span style="background-color: #ffe444">{{this.nameChangedMiddle}}</span>{{this.nameChangedEnd}}
        </p>
        <div class="collapse" v-bind:id="'question-search-by-name' + this.question_number">
            <UlForExamEnd :question_number="this.question_number + 1"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import UlForExamEnd from "./exam/UlForExamEnd";

    export default {
        name: "QuestionSearchByNameResult",
        components: {UlForExamEnd},
        props: ['question_number'],
        computed: {
            ...mapGetters(['get_time_of_exam', 'get_true_dict_for_exam', 'get_dict_for_test', 'get_active_theme', 'get_question_name_part']),
            nameChangedStart() {
                 return this.get_active_theme['questions'][this.question_number]['name'].slice(0, this.get_active_theme['questions'][this.question_number]['name'].toLowerCase().indexOf(this.get_question_name_part.toLowerCase()))
            },
            nameChangedMiddle() {
                return this.get_active_theme['questions'][this.question_number]['name'].slice(this.get_active_theme['questions'][this.question_number]['name'].toLowerCase().indexOf(this.get_question_name_part.toLowerCase()), this.get_active_theme['questions'][this.question_number]['name'].toLowerCase().indexOf(this.get_question_name_part.toLowerCase()) + this.get_question_name_part.length)
            },
            nameChangedEnd() {
                return this.get_active_theme['questions'][this.question_number]['name'].slice(this.get_active_theme['questions'][this.question_number]['name'].toLowerCase().indexOf(this.get_question_name_part.toLowerCase()) + this.get_question_name_part.length, this.get_active_theme['questions'][this.question_number]['name'].length)
            }
        },
    }
</script>

<style scoped>

</style>