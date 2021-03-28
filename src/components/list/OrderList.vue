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
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="dialogVisible1 = true"></el-button>
                <el-button type="success" size="mini" icon="el-icon-location-information" @click="getLocation"></el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-dialog
                @close="value = ''"
                title="提示"
                :visible.sync="dialogVisible1"
                width="30%">
            <el-cascader
                    v-model="value"
                    :options="cityData"
                    :props="{ expandTrigger: 'hover' }"></el-cascader>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible2"
                width="30%">
            <el-timeline reverse>
                <el-timeline-item

                        v-for="(activity, index) in location"
                        :key="index"
                        :timestamp="activity.time">
                    {{activity.context}}
                </el-timeline-item>
            </el-timeline>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
            </span>
        </el-dialog>
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
                dialogVisible1: false,
                dialogVisible2: false,
                cityData,
                value: '',
                location: []
            }
        },
        methods: {
            getLocation() {
                this.location = [
                    {
                        "time": "2018-05-10 09:39:00",
                        "ftime": "2018-05-10 09:39:00",
                        "context": "已签收,感谢使用顺丰,期待再次为您服务",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 08:23:00",
                        "ftime": "2018-05-10 08:23:00",
                        "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 07:32:00",
                        "ftime": "2018-05-10 07:32:00",
                        "context": "快件到达 [北京海淀育新小区营业点]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-10 02:03:00",
                        "ftime": "2018-05-10 02:03:00",
                        "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 23:05:00",
                        "ftime": "2018-05-09 23:05:00",
                        "context": "快件到达 [北京顺义集散中心]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 21:21:00",
                        "ftime": "2018-05-09 21:21:00",
                        "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 13:07:00",
                        "ftime": "2018-05-09 13:07:00",
                        "context": "顺丰速运 已收取快件",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 12:25:03",
                        "ftime": "2018-05-09 12:25:03",
                        "context": "卖家发货",
                        "location": ""
                    },
                    {
                        "time": "2018-05-09 12:22:24",
                        "ftime": "2018-05-09 12:22:24",
                        "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
                        "location": ""
                    },
                    {
                        "time": "2018-05-08 21:36:04",
                        "ftime": "2018-05-08 21:36:04",
                        "context": "商品已经下单",
                        "location": ""
                    }
                ]
                this.dialogVisible2 = true
            }
        }
    }
</script>

<style scoped>

</style>