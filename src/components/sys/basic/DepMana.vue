<template>
    <div style="width: 500px">

        <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText" prefix-icon="el-icon-search">
        </el-input>

        <el-tree
                class="filter-tree"
                :data="deps"
                :props="defaultProps"
                :filter-node-method="filterNode"
                expand-on-click-node
                ref="tree">

            <span class="custom-tree-node"
                  style="display: flex;justify-content: space-between;width:100%"
                  slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span >
          <el-button
class="depBtn"
                  size="mini"
                  type="primary"
                  @click="() => showAddDepView(data)">
            添加部门
          </el-button>
          <el-button
                  class="depBtn"
                  size="mini"
                  type="danger"
                  @click="() => deleteDep(node, data)">
            删除部门
          </el-button>
        </span>
      </span>

        </el-tree>
    </div>
</template>

<script>
    export default {
        name: "DepMana",
        data(){
            return{
                filterText:'',
                deps:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {

            this.initDeps();
        },

        methods: {
            showAddDepView(){

            },
            deleteDep(data){
                if (data.parent) {
                    this.$message("删除失败！")
                }else {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deleteRequest("/system/basic/department/"+data.id).then(resp=>{
                            if (resp) {
                                this.removeDepFromDeps(this.deps);

                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            removeDepFromDeps(deps,id){
                for(let i=0;i<deps.length;i++){
                    let d=deps[i];
                    if (d.id == id) {
                        deps.splice(i, 1);
                        return;
                    }else{
                        this.removeDepFromDeps(d.children, id);
                    }
                }

            },
            initDeps(){
              this.getRequest("/system/basic/department/").then(resp=>{
                  if (resp) {
                      console.log("resp:"+resp)
                      this.deps=resp;
                  }
              })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            }
        }
    }

</script>

<style scoped>
.depBtn{
    padding: 2px;
}
</style>