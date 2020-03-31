<template>
    <div>
        <div class="permissionManeTool">
            <el-input size="small" placeholder="请输入英文角色名称" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input size="small" placeholder="请输入中文角色名称" v-model="role.nameZh">
            </el-input>
            <el-button size="small" type="primary" icon="el-icon-plus" @click="doAddRole">添加</el-button>
        </div>
        <div class="permissManaMain">
            <el-collapse

                    accordion
                    v-model="activeName"

                    @change="change">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0;color: #ff315d" icon="el-icon-delete"
                                       type="text" @click="deleteRole(r)"></el-button>
                        </div>
                        <el-tree
                                show-checkbox
                                ref="tree"
                                :default-checked-keys="selectedMenus"
                                node-key="id"
                                :key="index"
                                :data="allMenus" :props="defaultProps" >

                        </el-tree>
                        <div style="display: flex;justify-content: flex-end">
                            <el-button size="small" @click="cancleUpdate">取消</el-button>
                            <el-button size="small" type="primary" @click="doUpdate(r.id,index)">确定</el-button>
                        </div>
                    </el-card>
                </el-collapse-item>

            </el-collapse>
        </div>
    </div>

</template>

<script>
    import {getRequest} from "../../../utils/api";

    export default {
        methods: {
            deleteRole(r){
                this.$confirm('此操作将永久删除'+r.nameZh+', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/permiss/role/"+r.id).then(resp=>{
                        if (resp) {
console.log("resp:"+resp);
                            this.initRoles();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
    },
            doAddRole(){
                if (this.role.nameZh && this.role.name) {
                    this.postRequest("/system/basic/permiss/role",this.role).then(resp=>{
                        if (resp) {
                            this.role.name='';
                            this.role.nameZh='';
                            this.initRoles();
                        }
                    })
                }else{
                    this.$message.error("不可以为空！");
                }
            },
            cancleUpdate(){
                this.activeName=-1;
            },

            doUpdate(rid,index){
                let tree=this.$refs.tree[index];
                let selectedKeys = tree.getCheckedKeys(true);
                console.log("selectedKeys:"+selectedKeys)
                let url="/system/basic/permiss/?rid="+rid;
                selectedKeys.forEach(key=>{
                    url+='&mids='+key
                })
                this.putRequest(url).then(resp=>{
                    if (resp) {
                        this.initRoles()
                    }
                })

            },
            initSelectedMenus(rid){
                this.getRequest("/system/basic/permiss/mids/"+rid).then(resp=>{
                    if (resp) {
                        console.log("resp:"+resp);
                        this.selectedMenus=resp;

                    }
                })
            },
            change(rid){//这个rid怎么传过来的  ？？？？
                /**
                 *
                 <!-- console.log("rid:"+rid);-->
                 */
                if (rid) {
                    console.log("name:"+name);
                    console.log(this.selectedMenus);
                    this.initSelectedMenus(rid);
                    this.initAllMenus();
                }

            },
            initAllMenus(){
                this.getRequest("/system/basic/permiss/menus/").then(resp=>{
                    if (resp) {
                        console.log(resp);
                        this.allMenus=resp;
                    }
                })
            },
            initRoles() {
                this.getRequest("/system/basic/permiss/").then(resp => {
                    if (resp) {
                        this.roles = resp;
                    }
                })
            }

        },
        name: "PermissMana",
        data() {
            return {
                activeName:-1,
                selectedMenus:[],
                allMenus:[],
                defaultProps:{
                    children:'children',
                    label:'name'
                },

                role: {
                    name: '',
                    nameZh: ''
                },
                roles: []
            }
        },
        mounted() {
            this.initRoles();
        }

    }
</script>

<style scoped>
    .permissionManeTool {
        display: flex;
        justify-content: flex-start;

    }

    .permissionManeTool .el-input {
        width: 300px;
        margin-right: 6px;
    }

    .permissManaMain {
        margin-top: 10px;
        width: 700px;
    }
</style>