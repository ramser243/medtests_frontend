import Vue from "vue";
import Vuex from "vuex";
import axios from '../axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // themes start
        themes: [],
        active_theme: false,
        active_theme_id: false,
        active_theme_name: false,
        theme_name_part: '',
        theme_search_input_value: '',
        // themes end

        //questions start
        active_question: false,
        question_name_part: '',
        //questions end

        variant_of_testing: false,
        true_dict_for_exam: {},
        dict_for_test: {}, //формат: {4(номер вопроса) : [false, true, false, false](выбранность ответов)}
        time_of_exam: null,
        correct_answers_exam: 0,
        loading: false,
        is_admin: false
    },
    getters: {
        // themes start
        get_themes: state => state.themes,
        get_active_theme_name: state => state.active_theme_name,
        get_active_theme_id: state => state.active_theme_id,
        get_active_theme: state => state.active_theme,
        get_theme_name_part: state => state.theme_name_part,
        // themes end

        //questions start
        get_active_question: state => state.active_question,
        get_question_name_part: state => state.question_name_part,
        //questions end

        get_variant_of_testing: state => state.variant_of_testing,
        get_dict_for_test: state => state.dict_for_test,
        get_time_of_exam: state => state.time_of_exam,
        get_true_dict_for_exam: state => state.true_dict_for_exam,
        get_correct_answers_exam: state => state.correct_answers_exam,
        get_loading: state => state.loading,
        is_admin: state => state.is_admin,
    },
    mutations: {
        SET_LOADING: (state, value) => state.loading = value,

        // themes start
        SET_THEMES: (state, value) => state.themes = value,
        SET_ACTIVE_THEME_NAME: (state, value) => state.active_theme_name = value,
        SET_ACTIVE_THEME_ID: (state, value) => state.active_theme_id = value,
        SET_ACTIVE_THEME: (state, value) => state.active_theme = value,
        SET_THEME_NAME_PART: (state, value) => state.theme_name_part = value,
        // themes end

        //questions start
        SET_ACTIVE_QUESTION: (state, value) => state.active_question = value,
        SET_QUESTION_NAME_PART: (state, value) => state.question_name_part = value,
        //questions end

        SET_VARIANT_OF_TESTING: (state, value) => state.variant_of_testing = value,
        SET_CLEAR_DICT_FOR_TEST: (state) => state.dict_for_test = {},
        SET_CLEAR_TRUE_DICT_FOR_EXAM: (state) => state.true_dict_for_exam = {},
        SET_NEW_QUESTION_TO_DICT_FOR_TEACHING: (state, value) => Vue.set(state.dict_for_test, value[0], value[1]),
        SET_CHANGE_QUESTION_TO_DICT_FOR_TEST: (state, value) => Vue.set(state.dict_for_test[value[0]], value[1], value[2]),
        SET_TIME_OF_EXAM: (state, value) => state.time_of_exam = value,
        SET_TRUE_DICT_FOR_EXAM: (state, value) => Vue.set(state.true_dict_for_exam, value[0], value[1]),
        SET_CORRECT_ANSWERS_EXAM: (state, value) => state.correct_answers_exam = value,
        SET_ADMIN: (state, value) => state.is_admin = value
    },
    actions: {
        startLoading({commit}) {
            commit('SET_LOADING', true)
        },
        stopLoading({commit}) {
            commit('SET_LOADING', false)
        },

        // theme start
        setStoreThemes({commit}) {
            axios.get('/themes')
                .then(function (response) {
                    let a = []
                    for (let i in response['data']) {
                        a.push(response['data'][i]['name'])
                    }
                    commit('SET_THEMES', a)
                })
        },
        setStoreActiveThemeId({commit}, value) {
            commit('SET_ACTIVE_THEME_ID', value)
            commit('SET_ACTIVE_THEME_NAME', (this.state.themes[value - 1]))
        },
        setStoreActiveTheme({commit, dispatch}, value) {
            commit('SET_ACTIVE_THEME', false)
            if (value[1]) {
                commit('SET_ACTIVE_THEME_NAME', (this.state.themes[value[1] - 1]))
            }
            if (value[0] == 'option') { // если приходит false или номер, при выборе варианта тестирования
                commit('SET_ACTIVE_THEME', (value[1]))
            } else if (value[0] == 'exam' || value[0] == 'test') {
                if (value[0] == 'exam') {
                    axios.get('/themes/exam/' + value[1])
                        .then(function (response) {
                            dispatch('setStoreActiveThemeToTest', response['data'])
                        })
                } else if (value[0] == 'test') {
                    axios.get('/themes/' + value[1])
                        .then(function (response) {
                            dispatch('setStoreActiveThemeToTest', response['data'])
                        })
                }
            }
        },
        setStoreActiveThemeToTest({commit}, value) {
            commit('SET_ACTIVE_THEME', value)
            value = value['questions']
            for (let i in value) {
                let a = []
                let b = []
                for (let j in value[i]['answers']) {
                    if (value[i]['answers'][j]['value'] == '1') {
                        a.push(true)
                    } else {
                        a.push(false)
                    }
                    b.push(false)
                }
                i++
                commit('SET_NEW_QUESTION_TO_DICT_FOR_TEACHING', [i, b])
                commit('SET_TRUE_DICT_FOR_EXAM', [i, a])
            }
        },
        setStoreThemeNamePart({commit}, value) {
            commit('SET_THEME_NAME_PART', value)
        },
        // theme end

        //questions start
        setStoreActiveQuestion({commit}, value) {
            commit('SET_ACTIVE_QUESTION', value)
        },
        setStoreQuestionNamePart({commit}, value) {
            commit('SET_QUESTION_NAME_PART', value)
        },
        //questions end

        setStoreVariantOfTesting({commit}, value) {
            commit('SET_VARIANT_OF_TESTING', value)
        },

        //ОЧИЩЕНИЕ СЛОВАРЯ ДЛЯ ТЕСТА С ОТВЕТАМИ
        setStoreClearDictForTest({commit}) {
            commit('SET_CLEAR_DICT_FOR_TEST')
            commit('SET_CLEAR_TRUE_DICT_FOR_EXAM')
        },

        //ЗАПОЛНЕНИЕ НОВОГО ВОПРОСА ЗНАЧЕНИЯМИ FALSE
        setStoreNewQuestionToTeaching({commit}, value) {
            commit('SET_NEW_QUESTION_TO_DICT_FOR_TEACHING', value)
        },

        setStoreChangeQuestionToTeaching({commit}, value) {
            commit('SET_CHANGE_QUESTION_TO_DICT_FOR_TEST', [this.state.active_question, value[0], value[1]])
            //value[0] - номер ответа в вопросе
            //value[1] - выбранность ответа
        },
        setStoreTimeOfExam({commit}, value) {
            commit('SET_TIME_OF_EXAM', value)
        },
        setStoreCountCorrectAnswers({commit}) {
            let counter = 0
            for (let i = 1; i <= 30; i++) {
                if (this.state.true_dict_for_exam[i].toString() == this.state.dict_for_test[i].toString()) {
                    counter++
                }
            }
            commit('SET_CORRECT_ANSWERS_EXAM', counter)
        },
        loginAdmin({commit}, value) {
             axios.post('/admin', {
                    login: value[0],
                    password: value[1]
                }).then(() => {
                    commit('SET_ADMIN', true)
                }).catch(() => {
                    commit('SET_ADMIN', false)
                })
        },
        saveAnswer({commit}, value) {
             axios.post('/answers/' + value[0], {
                    name: value[2],
                    value: value[1],
                    admin: 'true'
                })
        },
    }
});
export default store
