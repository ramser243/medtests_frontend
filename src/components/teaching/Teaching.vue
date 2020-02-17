<template>
    <div class="container">
        <div class="row">
            <HeaderForTesting/>
            <div class="col-12">
                <UlForTeaching
                        v-for="i in get_active_theme['questions_amount']"
                        v-if="get_active_question == i"
                        :question_number="i"
                        :key="i"/>
            </div>
            <ButtonBlock :variant_of_testing="'teaching'"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ButtonNext from '../buttons/ButtonNext'
    import UlForTeaching from './UlForTeaching'
    import ButtonPrevious from '../buttons/ButtonPrevious'
    import HeaderForTesting from "../HeaderForTesting";
    import ButtonEndExam from "../exam/ButtonEndExam";
    import ButtonBlock from "../buttons/ButtonBlock";

    export default {
        name: "Teaching",
        components: {ButtonBlock, HeaderForTesting, UlForTeaching},
        methods: {},
        computed: {
            ...mapGetters(['get_active_question', 'get_active_theme', 'get_true_dict_for_exam', 'get_dict_for_test'])
        }
    }
</script>

<style scoped>

</style>