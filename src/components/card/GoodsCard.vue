<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="text" @clear="select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="select"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="add">添加用户</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "GoodsCard",
        data() {
            return {
                text: ''
            }
        },
        methods: {
            select() {
                this.$emit('select',this.text)
            },
            add() {
                this.$router.replace('/goods/add')
            }
        }
    }
</script>

<style scoped>

</style>