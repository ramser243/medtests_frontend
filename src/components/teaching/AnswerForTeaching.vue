<template>
    <li v-bind:class="{'text-primary' : get_dict_for_test[get_active_question][number]}" @click="selectToggle" class="answer">
        <p>{{name}}</p>
    </li>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "AnswerForTeaching",
        props: ['name', 'number'],
        data: function () {
            return{
                isSelect: false
            }
        },
        methods: {
            selectToggle() {
                this.$store.dispatch('setStoreChangeQuestionToTeaching', [this.number, !this.get_dict_for_test[this.get_active_question][this.number]]) // меняет значение ответа в выбранном вопросе на противоположное
                this.isSelect = !this.isSelect
            },
        },
        computed: {
            ...mapGetters(['get_dict_for_test', 'get_active_question'])
        }
    }
</script>

<style scoped>

</style>