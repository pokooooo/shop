<template>
    <div>
    <el-table :data="ordersList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
             <template slot-scope="scope">
                 <el-tag v-if="scope.row.order_pay === '1'" type="success">已付款</el-tag>
                 <el-tag v-else type="danger">未付款</el-tag>
             </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
            <template slot-scope="scope">
                {{scope.row.update_time | dataFormat}}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template>
                <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                <el-button type="success" size="mini" icon="el-icon-location-information"></el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
    import cityData from "../../assets/citydata";

    export default {
        name: "OrdersList",
        props: {
            ordersList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                cityData
            }
        }
    }
</script>

<style scoped>

</style>