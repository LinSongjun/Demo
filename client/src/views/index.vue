<template>
    <div id="index">
        <app-header></app-header>
        <el-row>
            <el-col :span="3" class="left">
                <app-Nav></app-Nav>
            </el-col>
            <el-col :span="21" class="right">
                <router-view/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from './../components/Header'
    import Nav from './../components/Nav'
    export default {
        name: 'index.vue',
        components: {
            appHeader: Header,
            appNav: Nav
        }
    }
</script>

<style>
    #index,.el-row,.el-col{width: 100%; height: 100%}
    .left{height: 100%}
    .right{min-width: 650px; height: 100%;}
    a:hover{
        text-decoration: none;
    }
</style>
