<template>
    <div class="total">
        <div class="container">
            <h4>资金后台管理系统</h4>
            <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" v-model="registerForm.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="registerForm.password2" placeholder="请输入确认密码"></el-input>
                </el-form-item>
                <el-form-item label="身份" prop="identity">
                    <el-select v-model="registerForm.identity" placeholder="请选择身份">
                        <el-option v-for="identity in identitys" :label="identity.name" :value="identity.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data(){
            const validatePass = (rule, value, callback) => {
                if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            return {
                registerForm: {
                    email: '',
                    name: '',
                    password: '',
                    password2: '',
                    identity: ''
                },
                identitys: [
                    { name: '管理员', value: 'admin' },
                    { name: '员工', value: 'employee'}
                ],
                rules: {
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur'},
                        { min: 3, max: 16, message: '用户名长度必须在3-16位之间', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 3, max: 16, message: '密码长度必须在3-16位之间', trigger: 'blur'}
                    ],
                    password2: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 3, max: 16, message: '密码长度必须在3-16位之间', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur'}
                    ],
                    identity: [
                        { required: true, message: '请选择身份', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(registerForm) {
                this.$refs[registerForm].validate((valid) => {
                    if (valid) {
                        let isSuccess = false
                        this.$axios.post('/api/user/register', this.registerForm).then( user => {
                            if (user.data.message !== 'success') {
                                return this.$message({
                                    message: '注册失败，该邮箱已被注册!',
                                    type: 'error'
                                })
                            }
                            this.$message({
                                message: '注册成功!',
                                type: 'success'
                            })
                            this.$router.push('/login')
                        })
                    } else {
                        console.log('error register!!')
                        return false
                    }
                })
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
        height: 500px;
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
    .registerForm{
        width: 420px;
    }
    .el-form-item{
        margin: 30px 0;
    }
</style>