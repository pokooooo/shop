<template>
    <div>
        <breadcrumb :name="getName"></breadcrumb>
        <el-card>
            <div id="main" style="width: 800px;height:400px;"></div>
        </el-card>
    </div>
</template>

<script>
    import {getReport} from "../../network/reports";

    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
    import _ from 'lodash'

    export default {
        name: "Report",
        components: {
            Breadcrumb
        },
        data() {
            return {
                options: {
                    title: {
                        text: '用户来源'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#E9EEF3'
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            boundaryGap: false
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ]
                }
            }
        },
        computed: {
            getName() {
                return this.$route.params.name
            }
        },
        methods:{
            drawChart() {
                let myEchart = this.$echarts.init(document.getElementById("main"))
                getReport().then(res => {
                    const result = _.merge(res.data.data,this.options)
                    myEchart.setOption(result)
                })
            }
        },
        mounted() {
            this.drawChart()

        }

    }
</script>

<style scoped>

</style>