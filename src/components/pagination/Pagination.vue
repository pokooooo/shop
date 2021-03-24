<template>
    <div>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            queryInfo: {
                type: Object,
                default() {
                    return {}
                }
            },
            total: {
                type:Number,
                default: 0
            }
        },
        methods: {
            handleSizeChange(newSize) {
                this.$emit('setNewSize',newSize)
            },
            handleCurrentChange(newPage) {
                this.$emit('setNewPage',newPage)
            },
        }
    }
</script>

<style scoped>
    .el-pagination {
        margin-top: 15px;
    }
</style>