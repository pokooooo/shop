<template>
    <div>
        <breadcrumb :name="['商品管理','添加商品']"></breadcrumb>
        <el-card>
            <el-alert title="添加商品信息" type="info" center :show-icon="false"></el-alert>
            <el-steps :space="300" :active="activeIndex * 1" finish-status="success" align-center>
                <el-step title="商品信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <el-form ref="form" :model="addForm" :rules="addFormRules" label-position="top">
            <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeLeave"
            @tab-click="tabClick">
                <el-tab-pane label="基本信息" name="0">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="addForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goods_price">
                        <el-input v-model="addForm.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goods_weight">
                        <el-input v-model="addForm.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_number">
                        <el-input v-model="addForm.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                        <el-cascader
                                :show-all-levels="false"
                                v-model="addForm.goods_cat"
                                :options="cateList"
                                :props="props"></el-cascader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name="1">
                    <el-form-item v-for="item in manyCateList" :key="item.attr_id" :label="item.attr_name">
                        <el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox :label="subItem" v-for="(subItem,index) in item.attr_vals" :key="index" border></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品属性" name="2">
                    <el-form-item v-for="item in onlyCateList" :key="item.attr_id" :label="item.attr_name">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name="3">
                    <el-upload
                            action="http://47.108.206.212:9999/api/private/v1/upload"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name="4">
                    <quill-editor v-model="addForm.goods_introduce">

                    </quill-editor>
                    <el-button type="primary" @click="addGood">添加商品</el-button>
                </el-tab-pane>
            </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import _ from "lodash"

    import {getCateList} from "../../network/cates";
    import {getParamList} from "../../network/params";
    import {addGood} from "../../network/goods";

    import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

    export default {
        name: "Add",
        data() {
            return {
                activeIndex: '0',
                cateList: [],
                manyCateList: [],
                onlyCateList: [],
                props: {
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    value: 'cat_id',
                    children: 'children'
                },
                addForm: {
                    goods_name: '',
                    goods_cat: [],
                    goods_price: 0,
                    goods_number: 0,
                    goods_weight: 0,
                    goods_introduce: '',
                    attrs: []
                },
                addFormRules: {
                    goods_name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                    ],
                    goods_cat: [
                        {required: true, message: '请输入选择商品分类', trigger: 'blur'},
                    ],
                    goods_price: [
                        {required: true, message: '请输入商品价格', trigger: 'blur'},
                    ],
                    goods_number: [
                        {required: true, message: '请输入商品数量', trigger: 'blur'},
                    ],
                    goods_weight: [
                        {required: true, message: '请输入商品重量', trigger: 'blur'},
                    ]
                },
                // headers: {
                //     Authorization: window.sessionStorage.getItem('token')
                // }
            }
        },
        components: {
            Breadcrumb
        },
        methods: {
            getCateList() {
                getCateList().then(res => this.cateList = res.data.data)
            },
            beforeLeave(activeName,oldActiveName) {
                if(oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
                    this.$message.error('请先选择商品分类')
                    return false
                }
            },
            tabClick() {
                if(this.activeIndex === '1') {
                    getParamList(this.addForm.goods_cat[2],'many').then(res => {
                        res.data.data.forEach(item => {
                            item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
                        })
                        this.manyCateList = res.data.data
                    })
                } else if(this.activeIndex === '2') {
                    getParamList(this.addForm.goods_cat[2],'only').then(res => {
                        this.onlyCateList = res.data.data
                    })
                }
            },
            addGood() {
                this.$refs.form.validate(valid => {
                    if(!valid) return this.$message.error('请填写必要信息')
                })
                this.manyCateList.forEach(item => {
                    const newInfo = {
                        attr_id: item.attr_id,
                        attr_value: item.attr_vals.join(' ')
                    }
                    this.addForm.attrs.push(newInfo)
                })
                this.onlyCateList.forEach(item => {
                    const newInfo = {
                        attr_id: item.attr_id,
                        attr_value: item.attr_vals
                    }
                    this.addForm.attrs.push(newInfo)
                })
                let form = _.cloneDeep(this.addForm)
                form.goods_cat = form.goods_cat.join(',')
                console.log(form);
                addGood(form).then(res => {
                    console.log(res);
                    if(res.data.meta.status !== 201) return this.$message.error('添加失败!')
                    this.$message.success('添加成功!')
                    this.$router.replace('/goods')
                })
            }
        },
        created() {
            this.getCateList()
        }
    }
</script>

<style scoped>
    .el-steps {
        margin: 15px 0;
    }
    .el-step__title {
        font-size: 13px;
    }
    .el-checkbox{
        margin: 0 5px 0 0 !important;
    }
    .el-button{
        margin-top: 15px;
    }
</style>