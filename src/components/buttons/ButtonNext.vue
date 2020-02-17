<template>
    <button class="btn btn-u btn-next w-100" @click="nextQuestion"><span class="glyphicon glyphicon-arrow-right"></span></button>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ButtonNext",
        methods: {
            nextQuestion() {
                if (this.get_active_question == this.get_active_theme['questions_amount']) { //проверка: если последний вопрос в теме, то переключается на 1
                    this.$store.dispatch('setStoreActiveQuestion', 1)
                }
                else {
                    this.$store.dispatch('setStoreActiveQuestion', this.get_active_question + 1)
                }
                if (!(this.get_active_question in this.get_dict_for_test)) {
                    this.$store.dispatch('setStoreNewQuestionToTeaching', [this.get_active_question, new Array(parseInt(this.get_active_theme['questions'][this.get_active_question]['answers_amount'])).fill(false)]) //создает в словаре для теста с ответами ключ(номер вопроса) и значение(пустой словарь, в который будут добаляться ответы)
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