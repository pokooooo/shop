<template>
    <div>
        <breadcrumb :name = getName></breadcrumb>
        <el-card>
            <user-card @select="select" @refresh="refresh"></user-card>
            <user-list :userList="userList" @changeUserState="changeUserState" @refresh="refresh"></user-list>
        </el-card>
        <pagination :queryInfo="queryInfo" :total="total" @setNewSize="setNewSize" @setNewPage="setNewPage"></pagination>
    </div>
</template>

<script>
    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
    import UserCard from "../../components/card/UserCard";
    import UserList from "../../components/list/UserList";
    import Pagination from "../../components/pagination/Pagination";
    import {getUserList,setUserState} from "../../network/users";

    export default {
        name: "Users",
        components: {
            Breadcrumb,
            UserCard,
            UserList,
            Pagination
        },
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                },
                total: 0,
                userList: []
            }
        },
        computed: {
            getName() {
                return this.$route.params.name
            }
        },
        methods: {
            getUser() {
                getUserList(this.queryInfo).then(res => {
                    this.userList = res.data.data.users
                    this.total = res.data.data.total
                })
            },
            setNewSize(newSize) {
                this.queryInfo.pagesize = newSize
                this.getUser()
            },
            setNewPage(newPage) {
                this.queryInfo.pagenum = newPage
                this.getUser()
            },
            changeUserState(userInfo) {
                setUserState(userInfo).then(res => {
                    if(res.data.meta.status !== 200){
                        userInfo.mg_state = !userInfo.mg_state
                        return this.$message.error('用户状态更新失败!')
                    }
                    this.$message.success('用户状态更新成功!')
                })
            },
            select(query) {
                this.queryInfo.query = query
                this.getUser()
            },
            refresh() {
                this.getUser()
            }
        },
        created() {
            this.getUser()
        }
    }
</script>

<style scoped>

</style>