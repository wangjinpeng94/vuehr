<template>
    <div>
        <div style="display: flex;justify-content:space-between">
            <div>
                <el-input
                        placeholder="通过员工名搜索员工,记得回车哦..."
                        prefix-icon="el-icon-search"
                        style="width: 300px;margin-right: 10px"
                        v-model="keyword"
                        @keydown.enter.native="initEmps"
                        clearable
                        @clear="initEmps"

                ></el-input>

                <el-button icon="el-icon-search" type="primary" @click="initEmps">搜索</el-button>
                <el-button type="primary">
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    高级搜索
                </el-button>
            </div>
            <div>
                <el-button type="success">
                    <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    导入数据
                </el-button>

                <el-button type="success">
                    <i class="fa fa-arrow-down" aria-hidden="true"></i>
                    导出数据
                </el-button>


                <el-button type="primary" icon="el-icon-plus" @click="showEmpView">

                    添加用户
                </el-button>

            </div>

        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="emps"
                    stripe
                    border
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column
                        prop="name"
                        label="姓名"
                        fixed
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="workID"
                        label="工号"
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        align="left"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        label="身份证号"
                        align="left"
                        width="170">
                </el-table-column>

                <el-table-column
                        prop="wedlock"
                        label="婚姻状况"
                        align="left"
                        width="90">
                </el-table-column>

                <el-table-column
                        prop="nation.name"
                        label="民族"
                        align="left"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        label="籍贯"
                        align="left"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="politicsstatus.name"
                        label="政治面貌"
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="电子邮件"
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话号码"
                        align="left"
                        width="115">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="联系地址"
                        align="left"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        label="所属部门"
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="jobLevel.name"
                        label="职位"
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        label="职称"
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        label="聘用形式"
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        label="入职日期"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        label="转正日期"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        label="合同起始日期"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        label="合同截止日期"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="contractTerm"
                        label="合同期限"
                        align="left"
                        width="100">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}</el-tag>
                        年
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        label="最高学历"
                        align="left"
                        width="90">
                </el-table-column>


                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">

                    <template ><!--slot-scope="scope" -->
                        <el-button style="padding: 3px" size="mini">编辑</el-button>
                        <el-button style="padding: 3px" size="mini" type="primary">查看高级资料</el-button>
                        <el-button style="padding: 3px" size="mini" type="danger">删除</el-button>
                    </template>

                </el-table-column>

            </el-table>
            <div class="block" style="display: flex;justify-content: right">

                <el-pagination
                        @size-change="sizeChange"
                        @current-change="currentChange"
                        :current-page.sync="page"
                        :page-size="size"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <div>
            <el-dialog
                    title="添加员工"
                    :visible.sync="dialogVisible"
                    width="70%"
            >
                <el-form>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名" prop="emp.name">
                                <el-input style="width: 150px" prefix-icon="el-icon-edit" placeholder="请输入员工姓名..."
                                          v-model="emp.name"></el-input>
                            </el-form-item>
                        </el-col>


                        <el-col :span="6">
                            <el-form-item label="性别" prop="emp.gender">
                                <el-radio-group v-model="emp.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>


                        <el-col :span="6">
                            <el-form-item label="出生日期" pop="emp.birthday">

                                <el-date-picker type="date" placeholder="选择日期" v-model="emp.birthday"
                                                style="width: 150px;"></el-date-picker>


                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="政治面貌" prop="emp.politicId">

                                <el-select v-model="emp.politicId" style="width: 200px" placeholder="请选择活动区域">
                                    <el-option
                                            v-for="item in politicsstatus"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>
                                </el-select>


                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族" prop="emp.nationId">
                                <el-select v-model="emp.nationId" style="width: 150px" placeholder="请选择活动区域">
                                    <el-option
                                            v-for="item in nations"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="籍贯" prop="emp.nativePlace">
                                <el-input style="width: 100px"
                                          v-model="emp.nativePlace"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="电子邮箱" prop="emp.email">
                                <el-input style="width: 200px" prefix-icon="el-icon-message"
                                          v-model="emp.email"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="联系地址" prop="emp.address">
                                <el-input style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="emp.address"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位" prop="emp.posId">
                                <el-select v-model="emp.posId" style="width: 150px" placeholder="请选择职位">
                                    <el-option
                                            v-for="item in positions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="职称" prop="emp.jobLevelId">
                                <el-select v-model="emp.jobLevel" style="width: 150px" placeholder="请选择职称">
                                    <el-option
                                            v-for="item in jobLevel"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>

                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="所属部门" prop="emp.departmentId">
                                <el-popover
                                        placement="right"
                                        title="请选择部门"
                                        width="200"
                                        trigger="manual"


                                        v-model="popVisable">

                                        <el-tree :data="allDeps" default-expand-all
                                                 :props="defaultProps" @node-click="handleNodeClick">

                                        </el-tree>


                                    <div style="width: 150px;
                               display: inline-flex;
                               font-size: 13px;border: 1px solid #dedede;
                               height:26px;border-radius: 5px;cursor: pointer;
                               align-items: center;padding-left: 8px;box-sizing: border-box"
                                         slot="reference"
                                         @click="showDepView">{{inputDepname}}

                                    </div>
                                </el-popover>


                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="电话号码" prop="emp.phone">
                                <el-input style="width: 150px"
                                          v-model="emp.phone" prefix-icon="el-icon-phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号" prop="emp.workID">
                                <el-input style="width: 150px"
                                          v-model="emp.workID" disabled></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="学历" prop="emp.tiptopDegree">
                                <el-select v-model="emp.tiptopDegree" style="width: 150px" placeholder="请选择学历">
                                    <el-option
                                            v-for="item in tiptopDegree"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="毕业院校" prop="emp.school">
                                <el-input style="width: 150px"
                                          v-model="emp.school" prefix-icon="el-icon-edit"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="专业名称" prop="emp.specialty">
                                <el-input style="width: 200px"
                                          v-model="emp.specialty" prefix-icon="el-icon-edit"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期" pop="emp.beginDate">

                                <el-date-picker type="date" placeholder="选择日期" v-model="emp.beginDate"
                                                style="width: 150px;"></el-date-picker>


                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="转正日期" pop="emp.conversionTime">

                                <el-date-picker type="date" placeholder="选择日期" v-model="emp.conversionTime"
                                                style="width: 150px;"></el-date-picker>


                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期" pop="emp.beginContract">

                                <el-date-picker type="date" placeholder="选择日期" v-model="emp.beginContract"
                                                style="width: 150px;"></el-date-picker>


                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同终止日期" pop="emp.endContract">

                                <el-date-picker type="date" placeholder="选择日期" v-model="emp.endContract"
                                                style="width: 150px;"></el-date-picker>


                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号" prop="emp.idCard">
                                <el-input style="width: 250px"
                                          v-model="emp.idCard" prefix-icon="el-icon-edit"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="聘用形式" prop="emp.engageForm">
                                <el-radio-group v-model="emp.engageForm">
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="婚姻状况" prop="emp.wedlock">
                                <el-radio-group v-model="emp.wedlock">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>

                    </el-row>

                </el-form>

                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddEmp">确 定</el-button>
  </span>
            </el-dialog>
        </div>


    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data() {
            return {
                dialogVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                allDeps: [],
                emps: [],
                loading: false,
                popVisable: false,
                total: 0,
                page: 1,
                size: 10,
                keyword: '',
                emp: {
                    name: "江南一点雨",
                    gender: "男",
                    birthday: "1990-01-01",
                    idCard: "610122199001011256",
                    wedlock: "已婚",
                    nationId: 1,
                    nativePlace: "陕西",
                    politicId: 13,

                    email: "laowang@qq.com",
                    phone: "18565558897",
                    address: "深圳市南山区",
                    departmentId: 5,
                    jobLevelId: 9,
                    posId: 29,
                    engageForm: "劳务合同",
                    tiptopDegree: "本科",
                    specialty: "信息管理与信息系统",
                    school: "深圳大学",
                    beginDate: "2018-01-01",
                    workState: "在职",
                    workID: "00000001",
                    contractTerm: 2.0,
                    conversionTime: "2018-04-01",
                    notWorkDate: null,
                    beginContract: "2018-01-01",
                    endContract: "2020-01-01",
                    workAge: null


                },
                jobLevel: [],
                nations: [],
                politicsstatus: [],
                positions: [],
                tiptopDegree: ['博士', '硕士', '本科', '大专', '高中', '初中', '小学', '其他'],
                inputDepname:''


            }
        },
        mounted() {
            this.initEmps();
            this.initSelectBoxData();


        },
        methods: {
            doAddEmp(){
                this.postRequest("/emp/basic/",this.emp).then(resp=>{
                    this.dialogVisible=false;
                    this.initEmps();
                })
            },
            handleNodeClick(data) {
this.popVisable=!this.popVisable;
this.emp.departmentId=data.id;
this.inputDepname=data.name;
            },
            showDepView() {
                this.popVisable = !this.popVisable
            },
            getMaxWorkID() {
                this.getRequest("/emp/basic/maxWorkID/").then(resp => {
                    if (resp) {
                        this.emp.workID = resp.obj;
                    }
                })
            },
            initPositions() {
                if (!window.sessionStorage.getItem("positions")) {
                    this.getRequest("/emp/basic/positions/").then(resp => {
                        this.positions = resp;
                    })
                }
            },
            initSelectBoxData() {
                console.log("initSelectBoxData:")
                if (!window.sessionStorage.getItem("deps")) {
                    console.log(123)
                    this.getRequest("/emp/basic/deps").then(resp => {
                        if (resp) {
                            this.allDeps = resp;

                            window.sessionStorage.setItem("deps", JSON.stringify(resp))
                        }
                    })
                } else {
                    console.log(456)
                     this.allDeps = JSON.parse(window.sessionStorage.getItem("deps"))
                }

                if (!window.sessionStorage.getItem("jobLevel")) {
                    this.getRequest("/emp/basic/jobLevel").then(resp => {
                        if (resp) {
                            this.jobLevel = resp;
                            window.sessionStorage.setItem("jobLevel", JSON.stringify(resp))
                        }

                    })
                } else {
                    this.jobLevel = JSON.parse(window.sessionStorage.getItem("jobLevel"))
                }

                if (!window.sessionStorage.getItem("nations")) {
                    this.getRequest("/emp/basic/nations").then(resp => {
                        if (resp) {
                            this.nations = resp;
                            window.sessionStorage.setItem("nations", JSON.stringify(resp))
                        }

                    })
                } else {
                    this.nations = JSON.parse(window.sessionStorage.getItem("nations"))
                }

                if (!window.sessionStorage.getItem("politicsstatus")) {
                    this.getRequest("/emp/basic/politicsstatus").then(resp => {
                        if (resp) {
                            this.politicsstatus = resp;
                            window.sessionStorage.setItem("politicsstatus", JSON.stringify(resp))
                        }

                    })
                } else {
                    this.politicsstatus = JSON.parse(window.sessionStorage.getItem("politicsstatus"))
                }





            },
            showEmpView() {
                this.initPositions();
                this.getMaxWorkID();
                this.dialogVisible = true;
            },
            sizeChange(currentSize) {
                this.size = currentSize;
                this.initEmps();
            },
            currentChange(currentPage) {
                this.page = currentPage;
                this.initEmps();
            },
            initEmps() {
                this.emps = [];
                this.loading = true;
                this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size + "&keyword=" + this.keyword).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.emps = resp.data;
                        this.total = resp.total;

                    }
                })
            }

        }
    }
</script>

<style scoped>

</style>