<template>
    <div>
        <breadcrumb :name="this.$route.params.name"></breadcrumb>
        <el-card>
            <el-alert show-icon title="注意:只允许第三级分类设置相关参数" type="warning" :closable="false"></el-alert>
            <params-card :cateList="cateList"></params-card>
        </el-card>
    </div>
</template>

<script>
    import {getCateList} from "../../network/goods";

    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
    import ParamsCard from "../../components/card/ParamsCard";

    export default {
        name: "GoodsParams",
        components: {
            Breadcrumb,
            ParamsCard
        },
        data() {
            return {
                cateList: []
            }
        },
        computed: {
            getName() {
                this.$route.params.name
            }
        },
        created() {
            getCateList().then(res => this.cateList = res.data.data)
        }
    }
</script>

<style scoped>

</style>