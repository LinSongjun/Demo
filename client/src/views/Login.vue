<template>
    <div class="total">
        <div class="container">
            <h4>资金后台管理系统</h4>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="footer">
                <span>还没有账号？</span>
                <router-link to="/register">注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import jwt_decode from 'jwt-decode'
    export default {
        name: "login",
        data(){
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                rules: {
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 3, max: 16, message: '密码长度必须在3-16位之间', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(loginForm) {
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/user/login', this.loginForm).then( res => {
                            if (res.data.message !== 'success') {
                                //登陆失败
                                return this.$message({
                                    message: '登陆失败,账号或密码错误!',
                                    type: 'error'
                                })
                            }
                            const token = res.data.token
                            //把服务器返回的token写入localStorage
                            localStorage.setItem('token', token)
                            //解析token,并存入vuex
                            const decode = jwt_decode(token)
                            this.$store.dispatch('setIsToken', ! this.isEmpty(decode))
                            this.$store.dispatch('setUser', decode)
                            //跳转登陆页面
                            this.$router.push('/index')
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            isEmpty(value) {
                return (
                    value === undefined || value === false ||
                    (typeof value === 'object' && Object.keys(value).length === 0) ||
                    (typeof value === 'string' && value.trim().length === 0)
                )
            }
        }
    }
</script>

<style scoped>
    .total{
        width: 100%;
        height: 100%;
        display: inline-block;
        position: relative;
        background: url("./../assets/bg_1.png") center center no-repeat;
    }
    .container{
        width: 500px;
        height: 350px;
        margin: 100px auto;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 10px;
    }
    .container h4{
        font-size: 20px;
        text-align: center;
        padding: 30px 0 10px 0;
    }
    .loginForm{
        width: 420px;
    }
    .el-form-item{
        margin: 35px 0;
    }
    .footer{
        color: #999;
        font-size: 14px;
        padding: 0 15px 0 0;
        text-align: right;
    }
    .footer a{
        color: #3a8ee6;
    }
</style>