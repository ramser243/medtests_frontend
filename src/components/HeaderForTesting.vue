<template>
    <div>
<!--        {{this.get_true_dict_for_exam[get_active_question]}}-->
        <div class="col-12 question-header text-center header-text">
            {{questionHeaderText}}
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "HeaderForTesting",
        computed: {
            ...mapGetters(['get_active_question', 'get_active_theme', 'get_variant_of_testing', 'get_true_dict_for_exam']),
            questionHeaderText() {
                if (this.get_active_theme['questions']) {
                    return this.get_active_theme['questions'][this.get_active_question - 1]['name']
                }
            }
        },
    }
</script>

<style scoped>

</style>