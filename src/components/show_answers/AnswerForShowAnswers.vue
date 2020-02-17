<template>
    <li v-bind:class="{'text-success' : correctness == 1, 'list-style-circle' : correctness == 1}" class="answer">
        <p>{{name}}</p>
    </li>
</template>

<script>
    export default {
        name: "Answer",
        props: ['correctness', 'name']
    }
</script>

<style scoped>

</style>