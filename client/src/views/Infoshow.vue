<template>
    <div class="userlist">
        <el-row>
            <el-col :span="8">
                <img :src="user.avatar" alt="">
            </el-col>
            <el-col :span="16">
                <div>
                    <h1>邮箱：{{ user.email }}</h1>
                    <h1>姓名：{{ user.name }}</h1>
                    <h1>身份：{{ user.identity == 'admin' ? '管理员' : '员工' }}</h1>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Userlist",
        computed: {
            user() {
                return this.$store.getters.user
            }
        }
    }
</script>

<style scoped>
    .userlist,.el-row{
        width: 100%;
        height: 100%;
    }
    .el-col-8{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .el-col-16{
        background: #f6f6f6;
        display: flex;
        align-items: center;
    }
    .el-col-16 h1{
        padding: 10px 0 10px 30px;
    }
</style>