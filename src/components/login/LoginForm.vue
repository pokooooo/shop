<template>
    <div class="login-form">
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
            <el-form-item style="margin: 30px 20px 20px" prop="username">
                <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item style="margin: 0 20px" prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item style="position: absolute;left: 20px;bottom: 5px">
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
            <el-form-item style="position: absolute;right: 20px;bottom: 5px">
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login} from "../../network/login";

    export default {
        name: "LoginForm",
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                loginFormRules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            resetLoginForm() {
                this.$refs.loginForm.resetFields()
            },
            login() {
                this.$refs.loginForm.validate(valid => {
                    if(valid) {
                        login(this.loginForm).then(res => {
                            if(res.data.meta.status !== 200) this.$toast.show('登录失败')
                            else this.$toast.show('登录成功')
                            window.sessionStorage.setItem('token',res.data.data.token)
                            this.$router.replace('/home')
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-form{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 220px;
        width: 300px;
        background-color: #fff;
        border-radius: 20px;
    }
</style>