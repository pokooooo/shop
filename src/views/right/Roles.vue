<template>
    <div>
        <breadcrumb :name="getName"></breadcrumb>
        <roles-list :rolesList="rolesList" @refresh="refresh"></roles-list>
    </div>
</template>

<script>
    import {getRolesList} from "../../network/roles";
    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
    import RolesList from "../../components/list/RolesList";

    export default {
        name: "Roles",
        data() {
            return {
                rolesList: []
            }
        },
        components: {
            Breadcrumb,
            RolesList
        },
        methods: {
            getRolesList() {
                getRolesList().then(res => {
                    this.rolesList = res.data.data
                })
            },
            refresh() {
                this.getRolesList()
            }
        },
        computed: {
            getName() {
                return this.$route.params.name
            }
        },
        created() {
            this.getRolesList()
        }
    }
</script>

<style scoped>

</style>