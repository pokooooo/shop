<template>
    <div>
        <breadcrumb :name="getName"></breadcrumb>
        <el-card>
            <orders-card @select="select"></orders-card>
            <order-list :ordersList="ordersList"></order-list>
            <pagination :queryInfo="queryInfo" :total="total" @setNewSize="setNewSize" @setNewPage="setNewPage"></pagination>
        </el-card>
    </div>
</template>

<script>
    import {getOrdersList} from "../../network/orders";

    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
    import Pagination from "../../components/pagination/Pagination";
    import OrdersCard from "../../components/card/OrdersCard";
    import OrderList from "../../components/list/OrderList";


    export default {
        name: "Orders",
        components: {
            Breadcrumb,
            Pagination,
            OrdersCard,
            OrderList
        },
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 5
                },
                total: 0,
                ordersList: []
            }
        },
        methods: {
            getOrdersList() {
                getOrdersList(this.queryInfo).then(res => {
                    this.ordersList = res.data.data.goods
                    this.total = res.data.data.total
                })
            },
            setNewSize(newSize) {
                this.queryInfo.pagesize = newSize
                this.getOrdersList()
            },
            setNewPage(newPage) {
                this.queryInfo.pagenum = newPage
                this.getOrdersList()
            },
            select(text) {
                this.queryInfo.query = text
                this.getOrdersList()
            }
        },
        computed: {
            getName() {
                return this.$route.params.name
            }
        },
        mounted() {
            this.getOrdersList()
        }
    }
</script>

<style scoped>

</style>