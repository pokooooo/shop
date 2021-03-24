<template>
    <div>
        <breadcrumb :name="getName"></breadcrumb>
        <rights-list :rightsList="rightsList"></rights-list>

    </div>
</template>

<script>
    import {getRightsList} from '../../network/rights'
    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
    import RightsList from "../../components/rightslist/RightList"

    export default {
        name: "Rights",
        data(){
            return {
                rightsList: []
            }
        },
        components: {
            Breadcrumb,
            RightsList
        },
        computed: {
            getName() {
                return this.$route.params.name
            },
        },
        methods: {
            getRightsList() {
                getRightsList().then(res =>{
                    this.rightsList = res.data.data
                })
            }
        },
        created() {
            this.getRightsList()
        }
    }
</script>

<style scoped>

</style>