<template>
    <div>
        <el-menu
                unique-opened
                :default-active="activePath"
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409eff">
            <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.authName}}</span>
                </template>
                <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id"
                              @click="saveActivePath(subItem.path,item.authName,subItem.authName)">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{subItem.authName}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
    import {getLeftMenu} from "../../network/menu";

    export default {
        name: "LeftMenu",
        data() {
            return {
                menuList: []
            }
        },
        created() {
            getLeftMenu().then(res => {
                this.menuList = res.data.data
            })
        },
        methods: {
            saveActivePath(activePath,item,subItem){
                window.sessionStorage.setItem('activePath',activePath)
                this.$router.replace({
                    name: activePath,
                    params: {
                        name:[item,subItem]
                    }
                })
            }
        },
        computed: {
            activePath(){
                return window.sessionStorage.getItem('activePath')
            }
        }
    }
</script>

<style scoped>
    .el-menu{
        border-right: none;
    }
</style>