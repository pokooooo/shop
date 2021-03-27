<template>
    <div>
        <breadcrumb :name="['商品管理','添加商品']"></breadcrumb>
        <el-card>
            <el-alert title="添加商品信息" type="info" center :show-icon="false"></el-alert>
            <el-steps :space="200" :active="activeIndex * 1" finish-status="success" align-center>
                <el-step title="商品信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <el-tabs tab-position="left" style="height: 200px;" v-model="activeIndex">
                <el-tab-pane label="基本信息" name="0">用户管理</el-tab-pane>
                <el-tab-pane label="商品参数" name="1">配置管理</el-tab-pane>
                <el-tab-pane label="商品属性" name="2">角色管理</el-tab-pane>
                <el-tab-pane label="商品图片" name="3">定时任务补偿</el-tab-pane>
                <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

    export default {
        name: "Add",
        data() {
            return {
                activeIndex: '0'
            }
        },
        components: {
            Breadcrumb
        }
    }
</script>

<style scoped>
    .el-steps {
        margin: 15px 0;
    }
    .el-step__title {
        font-size: 13px;
    }
</style>