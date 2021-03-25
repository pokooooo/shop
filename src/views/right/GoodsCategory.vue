<template>
    <div>
        <breadcrumb :name="getName"></breadcrumb>
        {{cateList}}
        <pagination :queryInfo="queryInfo" :total="total" @setNewSize="setNewSize" @setNewPage="setNewPage"></pagination>
    </div>
</template>

<script>
    import {getCateList} from "../../network/goods";

    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
    import Pagination from "../../components/pagination/Pagination";

    export default {
        name: "GoodsCategory",
        components: {
            Breadcrumb,
            Pagination
        },
        data() {
            return {
                queryInfo:{
                    type: 3,
                    pagenum: 1,
                    pagesize:5
                },
                cateList: [],
                total: 0
            }
        },
        methods: {
            getCateList() {
                getCateList(this.queryInfo).then(res => {
                    console.log(res);
                    this.cateList = res.data.data.result
                    this.total = res.data.data.total
                })
            },
            setNewSize(newSize) {
                this.queryInfo.pagesize = newSize
                this.getCateList()
            },
            setNewPage(newPage) {
                this.queryInfo.pagenum = newPage
                this.getCateList()
            },
        },
        computed: {
            getName() {
                return this.$route.params.name
            }
        },
        created() {
            this.getCateList()
        }
    }

</script>

<style scoped>

</style>