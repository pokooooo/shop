<template>
    <div>
        <el-row :gutter="20" class="el-row">
            <el-col >
                <span>选择商品分类 : </span>
                <el-cascader
                        :show-all-levels="false"
                        v-model="pid"
                        :options="cateList"
                        :props="props"
                        @change="handleChange"
                        clearable
                ></el-cascader>
            </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="动态参数" name="many">
                <params-list :isDisable="isDisable" :list="manyList" :id="pid[2]" :name="activeName" @refresh="refresh"></params-list>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
                <params-list :isDisable="isDisable" :list="onlyList" :id="pid[2]" :name="activeName" @refresh="refresh"></params-list>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    import {getParamList} from "../../network/params";
    import ParamsList from "../list/ParamsList";

    export default {
        name: "ParamsCard",
        components: {
            ParamsList
        },
        props: {
            cateList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                pid: [],
                props: {
                    expandTrigger: 'hover',
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                },
                activeName: 'many',
                onlyList: [],
                manyList: []
            }
        },
        methods: {
            getParamList() {
                if(this.pid.length !== 3) {
                    this.onlyList = []
                    this.manyList = []
                    return
                }
                getParamList(this.pid[2],this.activeName).then(res =>{
                    res.data.data.forEach(item => {
                        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
                        item.inputVisible = false
                        item.inputValue = ''
                    })
                    if (this.activeName === 'only') this.onlyList = res.data.data
                    else this.manyList = res.data.data
                })
            },
            handleChange() {
                this.getParamList()
            },
            tabClick() {
                this.getParamList()
            },
            refresh() {
                this.getParamList()
            }
        },
        computed: {
            isDisable() {
                return !(this.pid.length === 3)
            }
        }
    }
</script>

<style scoped>
    .el-row{
        margin: 15px 0;
    }
</style>