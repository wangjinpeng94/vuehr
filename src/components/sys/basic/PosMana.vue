<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPosInput"
                    placeholder="添加职位"
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addPosition"
                    v-model="pos.name">
            </el-input>
            <el-button icon="el-icon-plus"
                       size="small" type="primary"
                       @click="addPosition">添加
            </el-button>
        </div>
        <div class="posManaMain">
            <el-table
                    :data="positions"
                    stripe
                    border
                    @selection-change="handleSelectionChange"
                    size="small"
                    style="width: 70%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        width="150"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag size="small" type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag size="small" type="danger"  v-else>未启用</el-tag>

                    </template>
                </el-table-column>
                <el-table-column label="操作">

                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>

                </el-table-column>
            </el-table>
            <el-button type="danger"
                       style="margin-top: 8px"
                       :disabled="multipleSelection.length==0"
                       @click="deleteMany"
            >批量删除</el-button>
        </div>
        <el-dialog
                title="修改职位"
                :visible.sync="dialogVisible"
                width="30%">

       <div>
           <div>

                   <el-tag>职位名称</el-tag>
                   <el-input class="updatePosInput"
                             v-model="updatePos.name"></el-input>

           </div>
           <div>
               <el-tag> 是否启用</el-tag>
               <el-switch
                       v-model="updatePos.enabled"
                       active-text="启用"
                       inactive-text="禁用">
               </el-switch>
           </div>
       </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PosMana",
        data() {
            return {
                pos:{
                    name: ''
                },
                dialogVisible:false,
                updatePos:{
                  name:'',
                    enabled:false
                },

                multipleSelection: [],
                positions: []
            }
        },
        mounted() {
            this.initPositions();
        },
        methods: {
            deleteMany(){
                this.$confirm('此操作将永久删除'+this.multipleSelection.length+', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids='?';
                    this.multipleSelection.forEach(item=>{
                        ids+='ids='+item.id+'&';
                    })
                    this.deleteRequest('/system/basic/pos/'+ids).then(resp=>{
                        if (resp) {
                            this.initPositions();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val){
                this.multipleSelection=val;
                console.log(val);
            },
            doUpdate(){
                this.putRequest('/system/basic/pos/',this.updatePos).then(resp=>{
                    if (resp) {
                        this.initPositions();
                        this.updatePos.name='';
                        this.dialogVisible=false;
                    }
                })
            },
            addPosition(){
                console.log("addPostion:");
                if (this.pos.name) {
                    this.postRequest('/system/basic/pos/',this.pos).then(resp =>{
                        if (resp) {
                            console.log("resp:" + resp);
                            this.initPositions();
                            this.pos.name='';
                        }
                    })
                } else {
                    this.$message.error('职位名称不可以为空');
                }
            },
            showEditView(index, data) {
                console.log(data);
                Object.assign(this.updatePos, data);
                this.dialogVisible=true;

            },
            handleDelete(index, data) {
                console.log(data);
                this.$confirm('此操作将永久删除'+data.name+'是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/pos/"+data.id).then(resp=>{
                        if (resp) {

                            this.initPositions();

                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initPositions() {
                this.getRequest('/system/basic/pos/').then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            }
        }

    }
</script>

<style scoped>
    .updatePosInput{
        width: 200px;

    }
    .addPosInput {
        width: 300px;
        margin-right: 8px
    }

    .posManaMain {
        margin-top: 10px;
    }
</style>