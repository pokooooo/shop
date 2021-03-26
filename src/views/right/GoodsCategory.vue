<template>
    <div>
        <breadcrumb :name="getName"></breadcrumb>
        <el-card>
            <cate-card @refresh="refresh"></cate-card>
            <cate-list :cateList="cateList"></cate-list>
        </el-card>
        <pagination :queryInfo="queryInfo" :total="total" @setNewSize="setNewSize" @setNewPage="setNewPage"></pagination>
    </div>
</template>

<script>
    import {getCateList} from "../../network/goods";

    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
    import Pagination from "../../components/pagination/Pagination";
    import CateCard from "../../components/card/CateCard";
    import CateList from "../../components/list/CateList";

    export default {
        name: "GoodsCategory",
        components: {
            Breadcrumb,
            Pagination,
            CateCard,
            CateList
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
            refresh() {
                this.getCateList()
            }
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