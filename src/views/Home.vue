<template>
    <div>
        <el-container class="home-container">
            <el-header>
                <div class="title">
                    <img src="../assets/image/peko.jpg" alt="">
                    <div>后台管理</div>
                    <el-button type="info" @click="logout">退出</el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <left-menu></left-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import LeftMenu from "../components/menu/LeftMenu"

    export default {
        name: "Home",
        components: {
            LeftMenu
        },
        methods: {
            logout() {
                window.sessionStorage.clear()
                this.$router.replace('/login')
            }
        }
    }
</script>

<style scoped>
    .home-container{
        height: 100vh;
    }

    .el-header{
        background-color: #373d41;
    }

    .el-aside{
        background-color: #333744;
    }

    .el-main{
        background-color: #eaedf1;
    }

    .title {
        margin-left: 50px;
        display: flex;
        position: relative;
    }

    .title>img{
        margin-top: 5px;
        height: 50px;
        width: 50px;
        border-radius: 50px;
    }

    .title>div{
        color: #fff;
        margin: auto 20px;
        font-size: 25px;
    }

    .title>.el-button{
        position: absolute;
        top: 10px;
        right: 20px;
    }
</style>