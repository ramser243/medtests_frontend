<template>
    <li v-bind:class="{'text-success' : correctness == 1, 'list-style-circle' : correctness == 1}" class="answer">
        <p v-if="!is_admin">{{name}}</p>
        <div v-else>
            <input type="checkbox" v-model="checked" @change="save_changes">
            <input style="width:100%" v-model="answer" @change="save_changes" type="text">
        </div>
    </li>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Answer",
        props: ['correctness', 'name', 'id'],
        data() {
            return {
                checked: this.correctness == 1,
                answer: this.name
            }
        },
        computed: {
            ...mapGetters(['is_admin']),
        },
        methods: {
            save_changes() {
                this.$store.dispatch('saveAnswer', [this.id, this.checked, this.answer])
            }
        }
    }
</script>

<style scoped>

</style>