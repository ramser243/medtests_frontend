<template>
    <div v-bind:class="{'button-block-for-exam' : this.variant_of_testing == 'exam', 'button-block-for-test-with-answers' : this.variant_of_testing != 'exam'}" class="custom-fixed-bottom">
        <ButtonPrevious/>
        <ButtonEndExam/>
        <ButtonNext/>
    </div>
</template>

<script>
    import ButtonPrevious from "./ButtonPrevious";
    import ButtonEndExam from "../exam/ButtonEndExam";
    import ButtonNext from "./ButtonNext";
    export default {
        name: "ButtonBlock",
        components: {ButtonNext, ButtonEndExam, ButtonPrevious},
        props: ['variant_of_testing']
    }
</script>

<style scoped>

</style>