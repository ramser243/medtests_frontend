<template>
    <div class="col-12 text-center welcome-block">
        <p class="header-text">Система дистанционного обучения и контроля знаний учащихся медицинских колледжей</p>
        <p class="main-text">Медицинские тесты УСО</p>
        <router-link class="btn btn-lg btn-dark" to="/themes">Начать обучение</router-link>
        <div class="welcome-dev-connect">
            <p class="header-text">Связь с разработчиком:</p>
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
</template>

<script>
    export default {
        name: "Welcome"
    }
</script>

<style scoped>

</style>