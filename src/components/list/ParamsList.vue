<template>
    <div >
        <el-button type="primary" size="mini" :disabled="isDisable" @click="dialogVisible = true">添加属性</el-button>
        <el-table :data="list" border stripe style="margin-top: 15px">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-tag closable v-for="(item,index) in scope.row.attr_vals" :key="index" @close="deleteParam(scope.row,index)">{{item}}</el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="scope.row.inputVisible"
                            v-model="scope.row.inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm(scope.row)"
                            @blur="handleInputConfirm(scope.row)"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                </template>
            </el-table-column>
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
    import {addParam,submitParam,deleteParam} from "../../network/params";

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
            },
            handleInputConfirm(row) {
                if(row.inputValue.trim().length === 0) {
                    row.inputValue = ''
                    row.inputVisible = false
                    return
                }
                row.attr_vals.push(row.inputValue.trim())
                submitParam(this.id,row.attr_id,row.attr_name,row.attr_sel,row.attr_vals.join(' ')).then()
                row.inputValue = ''
                row.inputVisible = false
            },
            showInput(row) {
                row.inputVisible = true
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus()
                })
            },
            deleteParam(row,index) {
                row.attr_vals.splice(index,1)
                submitParam(this.id,row.attr_id,row.attr_name,row.attr_sel,row.attr_vals.join(' ')).then()
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
    .el-tag{
        margin: 10px;
    }
    .input-new-tag{
        width: 120px;
    }
</style>