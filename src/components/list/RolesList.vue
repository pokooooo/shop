<template>
    <div>
        <el-card>
            <el-table :data="rolesList" border stripe>
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item1,index1) in scope.row.children" :key="index1" class="center">
                            <el-col :span="5">
                                <el-tag closable @close="remove(scope.row,item1)">{{item1.authName}}</el-tag>
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-row v-for="(item2,index2) in item1.children" :key="index2" class="center">
                                    <el-col :span="6">
                                        <el-tag type="success" closable @close="remove(scope.row,item2)">{{item2.authName}}</el-tag>
                                        <i class="el-icon-arrow-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag v-for="(item3,index3) in item2.children" type="warning"
                                                :key="index3" closable @close="remove(scope.row,item3)">{{item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting" @click="setRight(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
                title="分配权限"
                :visible.sync="dialogVisible"
                width="30%"
                @close="defKeys = []"
        >
            <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all
            :default-checked-keys="defKeys" ref="tree"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitRights">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {removeRight,getRightsTree,submitRights} from "../../network/rights";

    export default {
        name: "RolesList",
        props: {
            rolesList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                dialogVisible: false,
                rightsList: [],
                treeProps: {
                    label: 'authName',
                    children: 'children'
                },
                defKeys: [],
                roleID: ''
            }
        },

        methods: {
            remove(role,right) {
                this.$confirm('是否删除该限权?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeRight(role,right).then(res => {
                        if(res.data.meta.status !== 200){
                            return this.$message.error('删除失败!')
                        }
                        this.$message.success('删除成功!')
                        role.children = res.data.data
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            setRight(role) {
                this.roleID = role.id
                getRightsTree().then(res => {
                    this.rightsList = res.data.data
                    this.dialogVisible = true
                    this.getKeys(role,this.defKeys)
                })
            },
            getKeys(node,arr) {
                if(!node.children) {
                    return arr.push(node.id)
                }
                node.children.forEach(item =>
                    this.getKeys(item,arr)
                )
            },
            submitRights() {
                const keys = [
                    ...this.$refs.tree.getCheckedKeys(),
                    ...this.$refs.tree.getHalfCheckedKeys()
                ]
                const rights = keys.join(',')
                submitRights(this.roleID,rights).then(res => {
                    console.log(res);
                    if(res.data.meta.status !== 200){
                        return this.$message.error('提交失败!')
                    }
                    this.$message.success('提交成功!')
                    this.$emit('refresh')
                    this.dialogVisible = false
                })
            }
        },

    }
</script>

<style scoped>
    .el-tag {
        margin: 7px;
    }

    .center{
        display: flex;
        align-items: center;
    }
</style>