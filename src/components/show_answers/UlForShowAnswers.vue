<template>
    <ul >
        <AnswerForShowAnswers
                v-for="(answer_object, index) in get_active_theme['questions'][get_active_question - 1]['answers']"
                :name="answer_object['name']"
                :correctness="answer_object['value']"
                :id="answer_object['id']"
                :key="index"/>
    </ul>
</template>

<script>
    import {mapGetters} from 'vuex'
    import AnswerForShowAnswers from "./AnswerForShowAnswers";

    export default {
        name: "UlForTeaching",
        components: {AnswerForShowAnswers},
        computed: {
            ...mapGetters(['get_active_question', 'get_active_theme', 'get_dict_for_test'])
        }
    }
</script>

<style scoped>

</style>