<template>
   <div>
       <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
           <h3 class="logintitle">系统登录</h3>
           <el-form-item prop="username">
               <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
               <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入用户密码"></el-input>
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
        data(){
            return{
                loginForm:{
                    username:'admin',
                    password:'123'
                },
                checked: true,
                rules:{
                    username:[{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password:[{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }

        },
        methods: {
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        console.log("loginForm:"+this.loginForm);
                        postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{

                            if(resp){
                                alert(JSON.stringify(resp))
                                alert("resp:")
                            }

                        })
                        alert(123);
                        alert("loginForm:"+this.loginForm);
                        console.log("loginForm:");
                        console.log("username:"+this.loginForm.username);
                        console.log("password:"+this.loginForm.password);
                        console.log(456);
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
.loginContainer{
    border: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6cd;
}
    .logintitle{
        margin: 20px auto 20px auto;
        text-align: center;
        color:#405458


    }
    .loginRemeber{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
</style>