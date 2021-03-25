<template>
    <div>
        <el-card>
            <el-table :data="rightsList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.level === '2'">三级</el-tag>
                    </template>
                </el-table-column>


            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "RightList",
        props: {
            rightsList: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>

</style>