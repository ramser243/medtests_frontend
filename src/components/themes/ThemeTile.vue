<template>
        <div>
            <p>
                {{this.nameChangedStart}}<span style="background-color: #ffe444">{{this.nameChangedMiddle}}</span>{{this.nameChangedEnd}}
            </p>
        </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "ThemeTile",
        computed: {
             ...mapGetters(['get_theme_name_part']),
            nameChangedStart() {
                 return this.name.slice(0, this.name.toLowerCase().indexOf(this.get_theme_name_part.toLowerCase()))
            },
            nameChangedMiddle() {
                return this.name.slice(this.name.toLowerCase().indexOf(this.get_theme_name_part.toLowerCase()), this.name.toLowerCase().indexOf(this.get_theme_name_part.toLowerCase()) + this.get_theme_name_part.length)
            },
            nameChangedEnd() {
                return this.name.slice(this.name.toLowerCase().indexOf(this.get_theme_name_part.toLowerCase()) + this.get_theme_name_part.length, this.name.length)
            }
        },
        props: ['name'],
        updated() {

        }
    }
</script>

<style lang="scss">

</style>