<template>
    <div >
        <el-button type="primary" size="mini" :disabled="isDisable" @click="dialogVisible = true">添加属性</el-button>
        <el-table :data="list" border stripe style="margin-top: 15px">
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                :title="'添加' + getName"
                :visible.sync="dialogVisible"
                width="30%"
                @close="name_ = ''">
                <el-input v-model="name_"><template slot="prepend">{{getName}}</template></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParam">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {addParam} from "../../network/params";

    export default {
        name: "ParamsList",
        props: {
            isDisable: true,
            list: {
                type: Array,
                default() {
                    return []
                }
            },
            name: '',
            id: 0
        },
        data() {
            return {
                dialogVisible: false,
                name_: ''
            }
        },
        methods: {
            addParam() {
                addParam(this.id,this.name_,this.name).then(res => {
                    if(res.data.meta.status !== 201) return this.$message.error('添加失败!')
                    this.$message.success('添加成功!')
                    this.$emit('refresh')
                    this.dialogVisible = false
                })
            }
        },
        computed: {
            getName() {
                if(this.name === 'only') return '静态属性'
                else return '动态参数'
            }
        }
    }
</script>

<style scoped>

</style>