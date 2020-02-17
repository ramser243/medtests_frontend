<template>
    <div class="container exam-end-container">
        <div class="row">
            <div class="col-12 header-text">
                Время выполнения: {{get_time_of_exam}}
            </div>
            <div class="col-12 header-text">
                Ваш результат: {{get_correct_answers_exam}}/30
            </div>
            <div class="progress">
                <div class="progress-bar progress-bar-striped" :style="'width: ' + this.percentage + '%'" role="progressbar" aria-valuemin="0" aria-valuemax="100">{{this.percentage}}%</div>
            </div>
        </div>
        <EndExamQuestion
                class="rounded"
                v-for="i in 30"
                :question_number="i"
                :key="i"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import EndExamQuestion from "./EndExamQuestion";

    export default {
        name: "ExamEnd",
        components: {EndExamQuestion},
        data() {
            return {
                percentage: 0
            }
        },
        computed: {
            ...mapGetters(['get_time_of_exam', 'get_true_dict_for_exam', 'get_dict_for_test', 'get_active_theme', 'get_correct_answers_exam'])
        },
        methods: {
            percentagePlus() {
                if (this.percentage < Math.round((this.get_correct_answers_exam / 30) * 100)) {
                    setTimeout(() => {
                        this.percentage++
                        this.percentagePlus()
                    }, 20)
                }
            }
        },
        mounted() {
            console.log(Math.round((this.get_correct_answers_exam /30) * 100))
            // for (let i = 0; i < Math.round((this.get_correct_answers_exam / 30) * 100); i++) {
            //     console.log(i)
                this.percentagePlus()
            // }
        }
    }
</script>

<style scoped>

</style>