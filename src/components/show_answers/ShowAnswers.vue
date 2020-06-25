<template>
    <div class="container">
        <div class="row">
            <HeaderForTesting/>
            <div class="col-12">
                <UlForShowAnswers
                        v-for="i in get_active_theme['questions_amount']"
                        v-if="get_active_question == i"
                        :key="i"/>
            </div>
            <ButtonBlock :variant_of_testing="'show_answers'"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import UlForShowAnswers from "./UlForShowAnswers";
    import HeaderForTesting from "../HeaderForTesting";
    import ButtonBlock from "../buttons/ButtonBlock";

    export default {
        name: "ShowAnswers",
        components: {ButtonBlock, HeaderForTesting, UlForShowAnswers},
        computed: {
            ...mapGetters(['get_active_question', 'get_active_theme'])
        }
    }
</script>

<style scoped>

</style>