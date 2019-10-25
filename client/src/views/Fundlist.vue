<template>
    <div class="fundlist">
        <div class="top">
            <div class="time">
                <el-form ref="timeForm" v-model="timeForm" :inline="true" >
                    <el-form-item label="按日期筛选" class="time-title">
                        <el-date-picker type="date" placeholder="请选择开始日期" v-model="timeForm.startDate" size="small"></el-date-picker>
                    </el-form-item>
                    <el-form-item>--</el-form-item>
                    <el-form-item>
                        <el-date-picker type="date" placeholder="请选择结束日期" v-model="timeForm.endDate" size="small"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSelect" size="small">查询</el-button>
                    </el-form-item>
                </el-form>

            </div>
            <div class="add">
                <el-button type="success" size="small" @click="handleAdd">添加</el-button>
            </div>
            <div style="clear: both"></div>
        </div>
        <el-table :data="tableData" style="width: 100%" border empty-text="暂无数据">
            <el-table-column label="序号" type="index" width="70" align="center"></el-table-column>
            <el-table-column label="日期" align="center" prop="date">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="收支类型" align="center" prop="type">
                <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述" align="center" prop="describe">
                <template slot-scope="scope">
                    <span>{{ scope.row.describe }}</span>
                </template>
            </el-table-column>
            <el-table-column label="收入" align="center" prop="income">
                <template slot-scope="scope">
                    <span style="color: #67c23a">+{{ scope.row.income }}</span>
                </template>
            </el-table-column>
            <el-table-column label="支出" align="center" prop="expenditure">
                <template slot-scope="scope">
                    <span style="color: #f56c6c">-{{ scope.row.expenditure }}</span>
                </template>
            </el-table-column>
            <el-table-column label="账户资金" align="center" prop="cash">
                <template slot-scope="scope">
                    <span style="color: #409eff">{{ scope.row.cash }}</span>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center" prop="remark" width="140">
                    <template slot-scope="scope">
                    <span>{{ scope.row.remark }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" prop="operation">
                <template slot-scope="scope">
                    <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="page.page_sizes"
                    :page-size="page.page_size"
                    :layout="page.layout"
                    :total="page.total">
            </el-pagination>
        </div>
        <Dialog :dialog="dialog" :dialogForm="dialogForm" @update="getProfile"></Dialog>
    </div>
</template>

<script>
    import Dialog from "../components/Dialog";
    export default {
        name: "Fundlist",
        created(){
            this.getProfile()
        },
        data(){
            return {
                page: {
                    currentPage: 1,  //当前页
                    total: 0,  //总条数
                    page_size: 5,  //每页显示几条
                    page_sizes: [5, 10, 15, 20],
                    layout: 'total, sizes, prev, pager, next, jumper' //翻页属性
                },
                allTableData: [],
                searchData: [],
                tableData: [],
                dialog: {
                    show: false,
                    title: '',
                    option: ''
                },
                dialogForm: {},
                currentPage: 1,
                timeForm: {
                    startDate: '',
                    endDate: ''
                }
            }
        },
        methods: {
            getProfile() {
                this.$axios.get('/api/profile/').then( res => {
                    this.allTableData = res.data
                    this.searchData = res.data
                    //设置分页数据,并显示初始页
                    this.setPage()
                })
            },
            handleAdd() {
                this.dialog = {
                    show: true,
                    title: '添加收支信息',
                    option: 'add'
                }
                this.dialogForm = {
                    type: '',
                    describe: '',
                    income: '',
                    expenditure: '',
                    cash: '',
                    remark: '',
                    id: ''
                }
            },
            handleEdit(index, row) {
                this.dialog = {
                    show: true,
                    title: '修改收支信息',
                    option: 'edit'
                }
                this.dialogForm = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expenditure: row.expenditure,
                    cash: row.cash,
                    remark: row.remark,
                    id: row._id
                }
            },
            handleDelete(index, row) {
                this.$axios.delete(`/api/profile/del/${ row._id }`).then( res => {
                    this.$message({
                        message: '删除数据成功',
                        type: 'success'
                    })
                    this.getProfile()
                })
            },
            setPage() {
                this.page.total = this.allTableData.length
                this.page.page_size = 5
                this.tableData = this.allTableData.filter( (item, index) => {
                    return index < this.page.page_size
                })
            },
            handleSizeChange(page_size) {
                this.page.page_size = page_size
                this.tableData = this.allTableData.filter( (item, index) => {
                    return index < page_size
                })
            },
            handleCurrentChange(page) {
                this.page.currentPage = page
                const first = this.page.page_size * ( page - 1 )
                const last = this.page.page_size * page
                this.tableData = this.allTableData.filter( (item, index) => {
                    return index >= first && index < last
                })
            },
            onSelect() {
                if (! this.timeForm.startDate || ! this.timeForm.endDate) {
                    this.$message({
                        message: '请输入开始日期和结束日期',
                        type: 'error'
                    })
                    this.getProfile()
                    return
                }
                const start = this.timeForm.startDate.getTime()
                const end = this.timeForm.endDate.getTime()
                this.allTableData = this.searchData.filter( (item, index) => {
                    let date = new Date(item.date)
                    let time = date.getTime()
                    return time >= start && time <= end
                })
                this.setPage()
            }
        },
        components: {
            Dialog
        }
    }
</script>

<style scoped>
    .fundlist{
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
    .top{
        margin: 10px 0;
     }
    .time{
        float: left;
    }
    .add{
        float: right;
    }
    .pagination{
        float: right;
        margin: 10px 0;
    }
</style>