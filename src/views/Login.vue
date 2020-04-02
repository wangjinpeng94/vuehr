<template>
    <div>
        <el-form :rules="rules"
                 v-loading="loading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0.8)"
                 ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="logintitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
                <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入用户密码"
                          @keydown.enter.native="submitLogin"></el-input>
                <el-checkbox class="loginRemeber" v-model="checked"></el-checkbox>
                <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {postKeyValueRequest} from "../utils/api";


    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                loginForm: {
                    username: 'admin',
                    password: '123'
                },
                checked: true,
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }

        },
        methods: {
            submitLogin() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;

                        postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
                            this.loading = false;
                            if (resp) {
                                // alert(JSON.stringify(resp))
                                // alert("resp:")
                                window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                                let path = this.$route.query.redirect;
                                this.$router.replace((path == '/' || path == undefined) ? 'home' : path);


                            }

                        })
                       
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请输入所有字段',
                            type: 'error'
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .loginContainer {
        border: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6cd;
    }

    .logintitle {
        margin: 20px auto 20px auto;
        text-align: center;
        color: #405458


    }

    .loginRemeber {
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
</style>