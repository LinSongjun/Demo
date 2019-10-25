<template>
    <header class="container">
        <div class="boxName">
            <router-link to="/">
                <img class="logo" src="../assets/logo.jpg" alt="">
            </router-link>
            <router-link to="/" class="name">资金后台管理系统</router-link>
        </div>
        <div class="info">
            <div class="block">
                <img :src="user.avatar" alt="">
            </div>
            <el-dropdown trigger="click" @command="setOption">
                <span class="el-dropdown-link">
                    <div class="userInfo">
                        <span>欢迎</span><br>
                        <span>{{ user.name }}</span>
                    </div>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header.vue",
        computed: {
            user() {
                return this.$store.getters.user
            }
        },
        methods: {
            setOption(item) {
                switch (item) {
                    case 'info':
                        this.$router.push('/infoshow')
                        break
                    case 'logout':
                        localStorage.removeItem('token')
                        this.$store.dispatch('setIsToken', false)
                        this.$store.dispatch('setUser', null)
                        this.$router.push('/login')
                        break
                }
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        min-width: 500px;
        height: 60px;
        background: #324057;
        color: #fff;
        border-bottom: 1px solid #fff;
    }
    .boxName{
        padding-left: 10px;
        height: 100%;
        float: left;
    }
    .boxName a{
        display: inline-block;
        color: #fff;
        line-height: 60px;
        font-size: 20px;
    }
    .boxName a:last-child:hover{
        text-decoration: none;
    }
    .logo{
        width: 45px;
        height: 45px;
        margin: 5px;
        border-radius: 50%;
    }
    .info{
        height: 60px;
        float: right;
    }
    .info .block{
        width: 40px;
        height: 40px;
        display: block;
        margin: 10px 5px;
        float: left;
        overflow: hidden;
    }
    .block img{
        max-width: 100%;
        max-height: 100%;
    }
    .el-dropdown-link{
        padding-left: 10px;
        height: 60px;
        float: left;
        margin-right: 10px;
        cursor: pointer;
    }
    .el-dropdown-link:hover{
        background: #000;
    }
    .userInfo{
        width:35px;
        height: 60px;
        float: left;
        text-align: center;
        color: #fff;
        font-size: 14px;
        padding-top: 15px;
        box-sizing: border-box;
    }
    .el-icon-arrow-down{
        display: block;
        float: left;
        margin-top: 20px;
        margin-right: 5px;
        color: #fff;
    }
</style>