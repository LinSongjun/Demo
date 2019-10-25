<template>
    <div class="container">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" :modal-append-to-body="false" :close-on-click-modal="false">
            <el-form :model="dialogForm" :rules="rules" ref="dialogForm" label-width="100px" class="dialogForm">
                <el-form-item label="收支类型">
                    <el-select v-model="dialogForm.type" placeholder="请选择收支类型">
                        <el-option v-for="(type, index) in types" :label="type" :value="type" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="describe">
                    <el-input type="text" v-model="dialogForm.describe" placeholder="请添加描述"></el-input>
                </el-form-item>
                <el-form-item label="收入" prop="income">
                    <el-input type="text" v-model="dialogForm.income" placeholder="请输入收入金额"></el-input>
                </el-form-item>
                <el-form-item label="支出" prop="expenditure">
                    <el-input type="text" v-model="dialogForm.expenditure" placeholder="请输入支出金额"></el-input>
                </el-form-item>
                <el-form-item label="账户资金" prop="cash">
                    <el-input type="text" v-model="dialogForm.cash" placeholder="请输入账户资金"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="text" v-model="dialogForm.remark" placeholder="请输入备注内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clear(dialogForm)">取 消</el-button>
                <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Dialog.vue",
        data() {
            return {
                types: [
                    "优惠券",
                    "礼品券",
                    "预定",
                    "购买课程",
                    "提现",
                    "充值",
                    "转账"
                ],
                rules: {
                    describe: [
                        { required: true, message: '收支描述不能为空', trigger: 'blur' }
                    ],
                    income: [
                        { required: true, message: '收入金额不能为空', trigger: 'blur'}
                    ],
                    expenditure: [
                        { required: true, message: '支出金额不能为空', trigger: 'blur' }
                    ],
                    cash: [
                        { required: true, message: '账户资金为空', trigger: 'blur' }
                    ]
                }
            }
        },
        props: {
            dialog: Object,
            dialogForm: Object
        },
        methods: {
            submitForm(dialogForm) {
                const option = this.dialog.option
                this.$refs[dialogForm].validate((valid) => {
                    if (valid) {
                        switch (option) {
                            case 'add':
                                this.$axios.post('/api/profile/add', this.dialogForm).then( res => {
                                    this.$message({
                                        message: '添加成功!',
                                        type: 'success'
                                    })
                                    this.dialog.show = false
                                    //让父组件刷新执行update()
                                    this.$emit('update')
                                })
                                break
                            case 'edit':
                                this.$axios.post(`/api/profile/edit/${ this.dialogForm.id }`, this.dialogForm).then( res => {
                                    this.$message({
                                        message: '修改成功!',
                                        type: 'success'
                                    })
                                    this.dialog.show = false
                                    //让父组件刷新执行update()
                                    this.$emit('update')
                                })
                                break
                            default:
                                alert('非法操作!')
                                break
                        }
                    } else {
                        console.log('error addProfile!!')
                        return false
                    }
                })
            },
            clear(dialogForm) {
                this.dialog.show = false
            }
        }
    }
</script>

<style>

</style>