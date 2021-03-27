<template>
    <div>
        <el-table :data="goodsList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="商品名称" prop="goods_name"></el-table-column>
            <el-table-column label="商品价格(元)" prop="goods_price"></el-table-column>
            <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.add_time | dataFormat}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        props: {
            goodsList: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>

</style>