<template>
    <div class="modal fade" :id="this.modalId" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title" id="exampleModalCenterTitle">{{this.headerText}}</p>
                    <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- change question -->
                    <div class="modal-change-question-group" v-if="this.modalId == 'go-to-question-number-modal'">
                        <div class="change-question-block question-search-by-number">
                            <p>По номеру</p>
                            <input type="number" min="1"
                                   :max="this.get_active_theme['questions_amount']" v-model="inputNumber"
                                   @blur="inputBlur">
                            <div class="modal-questions-amount">/{{this.get_active_theme['questions_amount']}}</div>
                            <button class="btn btn-u" @click="changeQuestionByNumberButton">Перейти</button>
                        </div>
                        <div class="change-question-block question-search-by-name">
                            <p>По названию</p>
                            <input type="text" v-model="inputText">
                            <button class="btn btn-u" @click="changeQuestionByNameButton">Перейти</button>
                        </div>
                    </div>

                    <!-- change variant of testing -->
                    <div class="modal-change-variant-of-testing-and-menu"
                         v-if="this.modalId == 'change-variant-of-testing-modal'">
                        <p class="link-button-modal" @click="showAnswers">Тесты с ответами</p>
                        <p class="link-button-modal" @click="teaching">Обучение</p>
                        <p class="link-button-modal" @click="exam">Экзамен</p>
                    </div>

                    <!-- menu -->
                    <div class="modal-change-variant-of-testing-and-menu" v-if="this.modalId == 'open-menu-modal'">
                        <p class="link-button-modal" @click="backToThemeChoice">Вернуться к выбору темы</p>
                        <p class="link-button-modal" v-if="this.get_active_question" @click="makeAbuse">Пожаловаться на
                            вопрос</p>
                        <div class="link-button-modal">
                            <p>Связаться с разработчиком</p>
                            <div class="sm-list">
                                <div class="social vk">
                                    <a href="https://vk.com/dhdjsixbjxkss" target="_blank">
                                        <i class="fa fa-vk fa-2x"></i>
                                    </a>
                                </div>
                                <div class="social telegram">
                                    <a href="https://t-do.ru/ramser243" target="_blank">
                                        <i class="fa fa-telegram fa-2x"></i>
                                    </a>
                                </div>
                                <div class="social skype">
                                    <a href="https://join.skype.com/invite/i4dPiuHwDd57" target="_blank">
                                        <i class="fa fa-skype fa-2x"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- send abuse -->
                    <div class="modal-change-variant-of-testing-and-menu" v-if="this.modalId == 'open-abuse-modal'">
                        <div>Тема: <b>{{this.get_active_theme['name']}}</b></div>
                        <br>
                        <div>Вопрос: <b>{{getQuestionTitle}}</b></div>
                        <textarea rows="4" class="abuse-text" v-model="user_message"
                                  placeholder="Ваше предложение"></textarea>
                        <div>Оставьте свой email для обратной связи (необязательно)</div>
                        <input type="email" class="email-feedback" v-model="user_email">
                    </div>

                    <!-- search questions by name -->
                    <div class="modal-search-results-by-name modal-change-question-group"
                         v-if="this.modalId == 'open-search-by-name-results-modal'">
                        <div class="change-question-block question-search-by-name">
                            <p>По названию</p>
                            <input type="text" v-model="inputText">
                            <button class="btn btn-u" @click="changeQuestionByNameButton">Перейти</button>
                        </div>
                        <p class="results-text-block">По запросу <b>"{{this.get_question_name_part}}"</b> были найдены
                            следующие результаты:</p>
                        <QuestionSearchByNameResult

                                v-for="i in get_active_theme['questions_amount']"
                                :question_number="i - 1"
                                :key="i"/>
                    </div>
                </div>
                <div class="modal-footer" v-if="['open-abuse-modal'].includes(this.modalId)">
                    <button type="button" class="btn btn-u" @click="modalButtonClick">{{this.buttonText}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from '../axios'
    import QuestionSearchByNameResult from "./QuestionSearchByNameResult";

    export default {
        name: "Modal",
        components: {QuestionSearchByNameResult},
        props: ['buttonText', 'headerText', 'modalId'],
        data() {
            return {
                inputNumber: 1,
                inputText: '',
                user_message: '',
                user_email: '',
            }
        },
        computed: {
            ...mapGetters(['get_active_theme', 'get_active_question', 'get_question_name_part']),
            getQuestionTitle() {
                if (this.get_active_question && this.get_active_theme) {
                    return this.get_active_theme['questions'][this.get_active_question - 1]['name']
                } else {
                    return ''
                }
            },
            getQuestionId() {
                if (this.get_active_question && this.get_active_theme) {
                    return this.get_active_theme['questions'][this.get_active_question - 1]['id']
                } else {
                    return None
                }
            }
        },
        methods: {
            makeAbuse() {
                $('#open-menu-modal').modal('hide')
                $('#open-abuse-modal').modal('show')
            },
            sendMessage() {
                if (this.user_message.length > 0) {
                    var that = this
                    axios.post('questions/abuse', {
                        theme: this.get_active_theme['name'],
                        question: this.getQuestionTitle,
                        url: axios.defaults.baseURL + '/questions/' + this.getQuestionId,
                        message: this.user_message,
                        user_email: this.user_email
                    })
                        .then(function (response) {
                            that.user_message = ''
                            that.user_email = ''
                            $('#open-abuse-modal').modal('hide')
                        })
                }
            },
            modalButtonClick() {
                if (this.modalId == 'open-abuse-modal') {
                    this.sendMessage()
                }
            },
            inputBlur() {
                if (this.inputNumber < 1) {
                    this.inputNumber = 1
                } else if (this.inputNumber > this.get_active_theme['questions_amount']) {
                    this.inputNumber = this.get_active_theme['questions_amount']
                }
            },
            exam() {
                this.$store.dispatch('setStoreActiveTheme', ['exam', this.get_active_theme['id']])
                this.$store.dispatch('setStoreActiveQuestion', 1)
                $('#' + this.modalId).modal('hide')
                this.inputNumber = 1
                this.$router.push('/exam')
            },
            teaching() {
                this.$store.dispatch('setStoreActiveTheme', ['test', this.get_active_theme['id']])
                this.$store.dispatch('setStoreActiveQuestion', 1)
                $('#' + this.modalId).modal('hide')
                this.inputNumber = 1
                this.$router.push('/teaching')
            },
            showAnswers() {
                this.$store.dispatch('setStoreActiveTheme', ['test', this.get_active_theme['id']])
                this.$store.dispatch('setStoreActiveQuestion', 1)
                $('#' + this.modalId).modal('hide')
                this.inputNumber = 1
                this.$router.push('/show_answers')
            },
            backToThemeChoice() {
                $('#open-menu-modal').modal('hide')
                this.$router.push('/themes')
            },
            changeQuestionByNumberButton() {
                $('#' + this.modalId).modal('hide')
                this.$store.dispatch('setStoreActiveQuestion', parseInt(this.inputNumber))
                this.inputNumber = 1
            },
            changeQuestionByNameButton() {
                this.$store.dispatch('setStoreQuestionNamePart', this.inputText)
                $('#go-to-question-number-modal').modal('hide')
                $('#open-search-by-name-results-modal').modal('show')
            }
        },
    }
</script>

<style scoped>
    .abuse-text, .email-feedback {
        width: 100%;
        margin: 1rem 0;
    }
</style>