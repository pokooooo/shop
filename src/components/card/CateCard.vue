<template>
    <div>
        <el-button type="primary" @click="addCate">添加分类</el-button>
        <el-dialog
                title="添加分类"
                :visible.sync="dialogVisible"
                width="30%"
                @close="closeForm"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="80px">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="addForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-cascader
                            v-model="pid"
                            :options="cateList"
                            :props="props"
                            @change="handleChange"
                            clearable
                    change></el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getCateList,submitCate} from "../../network/goods";

    export default {
        name: "CateCard",
        data() {
            return {
                dialogVisible: false,
                addForm: {
                    cat_name: '',
                    cat_pid: 0,
                    cat_level: 0
                },
                addFormRules: {
                    cat_name: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'},
                    ],
                },
                cateList: [],
                props: {
                    expandTrigger: 'hover',
                    checkStrictly: true,
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                },
                pid: []
            }
        },
        methods: {
            closeForm() {
                this.$refs.addForm.resetFields()
                this.pid = []
                this.addForm.cat_level = 0
                this.addForm.cat_pid = 0
            },
            addCate() {
                this.dialogVisible = true
                getCateList({type: 2}).then(res => {
                    this.cateList = res.data.data
                })
            },
            handleChange() {
                if(this.pid.length !== 0) {
                    this.addForm.cat_pid = this.pid[this.pid.length - 1]
                    this.addForm.cat_level = this.pid.length
                } else {
                    this.addForm.cat_pid = 0
                    this.addForm.cat_level = 0
                }
            },
            submitCate() {
                submitCate(this.addForm).then(res => {
                    if(res.data.meta.status !== 201) return this.$message.error('添加失败!')
                    this.$message.success('添加成功!')
                    this.dialogVisible = false
                    this.$emit('refresh')
                })
            }
        }
    }
</script>

<style scoped>
    .el-cascader{
        width: 100%;
    }
</style>