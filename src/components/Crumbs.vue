<template>
    <div v-if="!get_loading" class="crumbs" v-bind:class="{'crumbs-triple' : this.$route.path == '/exam', 'crumbs-double' : this.$route.path != '/exam'}">
        <!-- left crumbs-->
        <div class="crumb-main left-crumb-main" @click="showGoToQuestionModal">
            <GearFill/>
            {{get_active_question + '/' + get_active_theme['questions_amount']}}</div>
        <div class="crumb-after left-crumb-after"><div></div></div>
        <!-- left crumbs end-->

        <!-- center crumbs-->
        <div class="crumb-after center-left-crumb-after"><div></div></div>
        <div class="crumb-main center-crumb-main" @click="showChangeVariantOfTesting">
            <GearFill/>
            {{variantOfTesting}}
        </div>
        <div class="crumb-after center-right-crumb-after"><div></div></div>
        <!-- center crumbs end-->

        <!-- right crumbs-->
        <div v-if="this.$route.path == '/exam'" class="crumb-main right-crumb-main">{{mins + ':' + secs}}</div>
        <div v-if="this.$route.path == '/exam'" class="crumb-after right-crumb-after"><div></div></div>
        <!-- right crumbs end-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import GearFill from "./icons/GearFill";
    export default {
        name: "Crumbs",
        components: {GearFill},
        data() {
            return {
                inputText: '',
                mins : 29,
                secs : 59,
                time_left: 1800,
            }
        },
        methods: {
            countDown() {
                if (this.time_left && !(this.get_variant_of_testing == 'exam_end')) {
                    return setTimeout(() => {
                        --this.time_left
                        this.mins = Math.floor(this.time_left / 60)
                        this.secs = this.time_left % 60
                        if (this.secs < 10) {
                            this.secs = '0' + this.secs.toString()
                        }
                        this.countDown()
                    }, 1000)
                }
                else {
                    if (this.$route.path != '/exam_end') {
                        this.$router.push('/exam_end')
                    }
                    this.$store.dispatch('setStoreVariantOfTesting', 'exam_end')
                    this.$store.dispatch('setStoreTimeOfExam', (this.minutsToString(this.mins) + this.secondToString(this.secs)))
                    this.time_left = 1800
                }
            },
            secondToString(count) {
                count = (59 - parseInt(count))
                if (count == 0) {
                    return ''
                }
                else if ([1].indexOf(count) != -1) {
                    return (count.toString() + ' секунда')
                }
                else if ([2, 3, 4].indexOf(count) != -1) {
                    return (count.toString() + ' секунды')
                }
                else if ([1, 2, 3, 4].indexOf(count) == -1) {
                    return (count.toString() + ' секунд')
                }
            },
            minutsToString(count) {
                count = (29 - parseInt(count))
                if (count == 0) {
                    return ''
                }
                else if ([1].indexOf(count) != -1) {
                    return (count.toString() + ' минута ')
                }
                else if ([2, 3, 4].indexOf(count) != -1) {
                    return (count.toString() + ' минуты ')
                }
                else if ([1, 2, 3, 4].indexOf(count) == -1) {
                    return (count.toString() + ' минут ')
                }
            },
            showGoToQuestionModal() {
                $('#go-to-question-number-modal').modal('show')
            },
            showChangeVariantOfTesting() {
                $('#change-variant-of-testing-modal').modal('show')
            }
        },
        computed: {
            ...mapGetters(['get_active_theme', 'get_active_question', 'get_variant_of_testing', 'get_loading']),
            variantOfTesting() {
                if (this.$route.path == '/exam') {
                    this.time_left = 1800
                    return 'Экзамен'
                } else if (this.$route.path == '/teaching') {
                    return 'Обучение'
                } else if (this.$route.path == '/show_answers') {
                    return 'Ответы'
                }
            }
        },
        mounted() {
            this.time_left = 1800
            this.countDown()
        },
    }
</script>

<style scoped>

</style>