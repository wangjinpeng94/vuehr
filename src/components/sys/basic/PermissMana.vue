<template>
    <div>
        <div class="permissionManeTool">
        <el-input  size="small" placeholder="请输入英文角色名称" v-model="role.name">
            <template slot="prepend">ROLE_</template>
        </el-input>
        <el-input  size="small" placeholder="请输入中文角色名称" v-model="role.nameZh">
        </el-input>
            <el-button size="small"  type="primary" icon="el-icon-plus">添加</el-button>
        </div>
        <div class="permissManaMain">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0;color: #ff315d" icon="el-icon-delete" type="text"></el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </el-collapse-item>

            </el-collapse>
        </div>
    </div>

</template>

<script>
    export default {
        name: "PermissMana",
        data(){
            return{
                activeName:2,
                role:{
                    name:'',
                    nameZh:''
                },
                roles:[]
            }
        },
        mounted() {
            this.initRoles();
        },
        methods:{
initRoles(){
    this.getRequest("/system/basic/permiss/").then(resp=>{
        if (resp) {
            this.roles=resp;
        }
    })
}

      }

    }
</script>

<style scoped>
.permissionManeTool{
display: flex;
    justify-content: flex-start;

}
    .permissionManeTool .el-input{
        width: 300px;
        margin-right: 6px;
    }
    .permissManaMain{
        margin-top: 10px;
        width: 700px;
    }
</style>