<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="text" @clear="select" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="select"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog
                title="添加用户"
                :visible.sync="dialogVisible"
                width="30%"
                @close="closeForm"
                >
            <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="70px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {addUser} from "../../network/users";

    export default {
        name: "Card",
        data() {
            return {
                text: '',
                dialogVisible: false,
                addForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                addFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                        ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                        ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        ],
                    mobile: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        ],
                }
            }
        },
        methods: {
            select() {
                this.$emit('select',this.text)
            },
            closeForm() {
                this.$refs.addForm.resetFields()
            },
            addUser() {
                this.$refs.addForm.validate(valid => {
                    if(!valid) return
                    addUser(this.addForm).then(res => {
                        if(res.data.meta.status !== 201){
                            return this.$message.error('添加失败!')
                        }
                        this.$message.success('添加成功!')
                        this.dialogVisible = false
                        this.$emit('refresh')
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .el-card {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
    }
</style>