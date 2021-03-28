<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="text" @clear="select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="select"></el-button>
                </el-input>
            </el-col>
        </el-row>
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