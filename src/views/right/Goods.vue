<template>
    <div>
        <breadcrumb :name="getName"></breadcrumb>
        <el-card>
            <goods-card @select="select"></goods-card>
            <good-list :goodsList="goodsList"></good-list>
            <pagination :queryInfo="queryInfo" :total="total" @setNewSize="setNewSize" @setNewPage="setNewPage"></pagination>
        </el-card>
    </div>
</template>

<script>
    import {getGoodsList} from "../../network/goods";

    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
    import Pagination from "../../components/pagination/Pagination";
    import GoodsCard from "../../components/card/GoodsCard";
    import GoodList from "../../components/list/GoodsList"

    export default {
        name: "Goods",
        components: {
            Breadcrumb,
            Pagination,
            GoodsCard,
            GoodList
        },
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                },
                total: 0,
                goodsList: []
            }
        },
        methods: {
            getGoodsList() {
                getGoodsList(this.queryInfo).then(res => {
                    this.goodsList = res.data.data.goods
                    this.total = res.data.data.total
                })
            },
            setNewSize(newSize) {
                this.queryInfo.pagesize = newSize
                this.getGoodsList()
            },
            setNewPage(newPage) {
                this.queryInfo.pagenum = newPage
                this.getGoodsList()
            },
            select(text) {
                this.queryInfo.query = text
                this.getGoodsList()
            }
        },
        computed: {
            getName() {
                return this.$route.params.name
            }
        },
        created() {
            this.getGoodsList()
        }
    }
</script>

<style scoped>

</style>