<template>
    <div>
        <el-table :data="userList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="电话" prop="mobile"></el-table-column>
            <el-table-column label="角色" prop="role_name"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="changeUserState(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="remove(scope.row.id)"></el-button>
                    <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                @close="closeDialog"
                title="修改用户"
                :visible.sync="dialogVisible1"
                width="30%">
            <el-form ref="userInfo" :model="userInfo" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="userInfo.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="userInfo.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                @close="closeDialog"
                title="修改角色"
                :visible.sync="dialogVisible2"
                width="30%">
            <p>当前用户:{{userInfo.username}}</p>
            <p>当前角色:{{userInfo.role_name}}</p>
            <el-select v-model="id" placeholder="请选择">
                <el-option
                        v-for="item in roles"
                        :key="item.id"
                        :label="item.roleName"
                        :value="item.id">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="submitRole">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {queryUserInfo,editUserInfo,removeUser} from "../../network/users";
    import {getRolesList,submitRole} from "../../network/roles";

    export default {
        name: "UserList",
        props: {
            userList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                dialogVisible1 :false,
                dialogVisible2: false,
                userInfo:{},
                roles: [],
                id: ''
            }
        },
        methods: {
            changeUserState(userInfo) {
                this.$emit('changeUserState',userInfo)
            },
            edit(id) {
                queryUserInfo(id).then(res => {
                    console.log(res);
                    this.userInfo = res.data.data
                })
                this.dialogVisible1 = true
            },
            remove(id) {
                this.$confirm('是否删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeUser(id).then(res => {
                        if(res.data.meta.status !== 200){
                            return this.$message.error('删除失败!')
                        }
                        this.$message.success('删除成功!')
                        this.$emit('refresh')
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            closeDialog() {
                this.userInfo = {}
                this.id = ''
            },
            editUserInfo() {
                editUserInfo(this.userInfo).then(res => {
                    if(res.data.meta.status !== 200){
                        return this.$message.error('修改失败!')
                    }
                    this.$message.success('修改成功!')
                    this.dialogVisible1 = false
                    this.$emit('refresh')
                })
            },
            setRole(userInfo) {
                this.dialogVisible2 = true
                this.userInfo = userInfo
                getRolesList().then(res => {
                    this.roles = res.data.data
                })
            },
            submitRole() {
                submitRole(this.userInfo.id,this.id).then(res => {
                    if(res.data.meta.status !== 200) return this.$message.error('修改失败')
                    this.$message.success('修改成功')
                    this.dialogVisible2 = false
                    this.$emit('refresh')
                })
            }
        }
    }
</script>

<style scoped>
    .el-table {
        margin-top: 15px;
    }
</style>