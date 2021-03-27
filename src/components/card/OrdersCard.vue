<template>
    <div>
        <el-input placeholder="请输入内容" v-model="text" @clear="select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="select"></el-button>
        </el-input>
    </div>
</template>

<script>
    export default {
        name: "OrdersCard",
        data() {
            return {
                text: ''
            }
        },
        methods: {
            select() {
                this.$emit('select',this.text)
            }
        }
    }
</script>

<style scoped>

</style>