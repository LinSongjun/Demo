<template>
    <div class="container">
        <div class="title">
            <h1>欢迎使用</h1>
            <h1>资金管理系统</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home.vue"
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url("../assets/bg_2.jpg") center center no-repeat;
        background-size: 100%;
    }
    .title{
        width: 400px;
        height: 200px;
        margin: 150px auto;
        text-align: center;
        color: #fff;
        font-size: 22px;
    }
    .title h1{
        padding-top: 10px;
    }
</style>