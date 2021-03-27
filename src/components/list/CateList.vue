<template>
    <div>
        <tree-table :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index
        border class="tree-table" stripe>
            <template #is="scope">
                <i class="el-icon-success" v-if="!scope.row.cat_deleted" style="color: lightgreen"></i>
                <i class="el-icon-error" v-else style="color: red"></i>
            </template>
            <template #order="scope">
                <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                <el-tag type="warning" size="mini" v-else-if="scope.row.cat_level === 2">三级</el-tag>
            </template>
            <template slot="option">
                <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </template>
        </tree-table>
    </div>
</template>

<script>
    export default {
        name: "CateList",
        props: {
            cateList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                columns:[
                    {
                        label: '分类名称',
                        prop: 'cat_name'
                    },
                    {
                        label: '是否有效',
                        type: 'template',
                        template: 'is'
                    },
                    {
                        label: '排序',
                        type: 'template',
                        template: 'order'
                    },
                    {
                        label: '操作',
                        type: 'template',
                        template: 'option'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .tree-table{
        margin-top: 15px;
    }
</style>