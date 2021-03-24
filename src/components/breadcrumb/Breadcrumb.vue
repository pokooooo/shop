<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{name[0]}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{name[1]}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "Breadcrumb",
        props: {
            name: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .el-breadcrumb {
        margin-bottom: 15px;
        font-size: 18px;
    }
</style>