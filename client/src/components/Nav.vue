<template>
    <div class="nav">
        <el-row>
            <el-col>
                <el-menu class="el-menu-vertical-demo" background-color="#324057" text-color="#fff" active-text-color="#409eff">
                    <router-link to="/home">
                        <el-menu-item index="0">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>
                    <template v-for="item in items">
                        <el-submenu v-if="item.children" :index="item.path">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.name }}</span>
                            </template>
                            <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
                                <el-menu-item :index="citem.path">{{ citem.name }}</el-menu-item>
                            </router-link>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Nav.vue",
        data(){
            return {
                items: [
                    {
                        icon: 'el-icon-s-marketing',
                        name: '资金管理',
                        path: 'fund',
                        children: [
                            {path: 'fundlist', name: '资金流水'}
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        name: '信息管理',
                        path: 'info',
                        children: [
                            {path: 'infoshow', name: '个人信息'}
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .nav{
        width: 100%;
        min-width: 240px;
        height: 100%;
        background: #324057;
    }
    .nav li{
        width: 240px;
    }
</style>