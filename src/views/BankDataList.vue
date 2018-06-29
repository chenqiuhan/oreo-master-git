<template>
    <div>
        <el-button type="info" plain class="el-icon-arrow-left"  @click="goBack()">返回</el-button>
        <div>
            <h3>项目名称：{{$route.params.id.name}}</h3>
            <div >
                <el-form ref="form" :model="sele">
                    <el-form-item>
                        <table style="width:1500px;">
                            <tr>
                                <td>查询帐号：</td>
                                <td><el-input v-model="sele.account" style="width:250px;"  placeholder="请输入查询账号" maxlength="40"></el-input></td>
                                <td>对方帐号：</td>
                                <td><el-input v-model="sele.toAccount" style="width:250px;"  placeholder="请输入对方账号" maxlength="40"></el-input></td>
                                <td>对方姓名：</td>
                                <td><el-input v-model="sele.toName" style="width:250px;"  placeholder="请输入对方姓名" maxlength="40"></el-input></td>
                                <td>资金流向：</td>
                                <td><el-select v-model="sele.borrowFlag" placeholder="请选择" style="width:250px;">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <td>资金范围：</td>
                                <td >
                                    <el-input v-model="sele.minMoney" style="width:115px;"  placeholder="最小金额" maxlength="20"></el-input> - 
                                    <el-input v-model="sele.maxMoney" style="width:115px;"  placeholder="最大金额" maxlength="20"></el-input>元
                                </td>
                                <td>开始时间：</td>
                                <td>
                                    <el-date-picker
                                        v-model="sele.transactionDateStrStart"
                                        type="datetime"
                                        style="width:250px;"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择开始时间">
                                    </el-date-picker>
                                </td>
                                <td>结束时间：</td>
                                <td>
                                    <el-date-picker
                                        v-model="sele.transactionDateStrEnd"
                                        type="datetime"
                                        style="width:250px;"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择结束时间">
                                    </el-date-picker>
                                </td>
                                <td></td>
                                <td><el-button type="primary" icon="el-icon-search" @click="selectProjectBankFlow">查询</el-button></td>
                            </tr>
                        </table>
                    </el-form-item>
                </el-form>
            </div>
            <el-table
                :row-class-name="tableRowClassName"
                :data="tableData"
                height="600"
                style="width: 100%">

                <el-table-column prop="account" label="查询账号" width="250" align="center" ></el-table-column>
                <el-table-column prop="toName" label="对方账号姓名"  width="180" align="center"></el-table-column>
                <el-table-column prop="toAccount" label="对方账号卡号" width="250"  align="center"></el-table-column>
                <el-table-column prop="money" label="金额" width="150" align="center"></el-table-column>
                <el-table-column prop="balance" label="余额" width="150" align="center"></el-table-column>
                <el-table-column prop="transactionResult" label="交易结果" width="100" align="center"></el-table-column>
                <el-table-column prop="transactionDate" label="交易时间" width="200" align="center"></el-table-column>
                <el-table-column prop="borrowFlag" label="资金流向" width="150" align="center"></el-table-column>

                <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">详情</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div>
            <el-dialog title="银行流水详情" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <table  style="height:50px;">
                        <tr >
                            <td style="width:50%;">
                                <el-form-item label="查询账号：" :label-width="formLabelWidth">
                                <el-input v-model="form.account" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="对方账号姓名：" :label-width="formLabelWidth">
                                    <el-input v-model="form.toName" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="对方账号：" :label-width="formLabelWidth">
                                    <el-input  v-model="form.toAccount" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="金额：" :label-width="formLabelWidth">
                                    <el-input  v-model="form.money" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="余额：" :label-width="formLabelWidth">
                                    <el-input  v-model="form.balance" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="借贷标志：" :label-width="formLabelWidth">
                                    <el-input v-model="form.borrowFlag" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="交易类型：" :label-width="formLabelWidth">
                                    <el-input v-model="form.transactionType" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="交易结果：" :label-width="formLabelWidth">
                                    <el-input v-model="form.transactionResult" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="交易时间：" :label-width="formLabelWidth">
                                    <el-input v-model="form.transactionDate" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="交易开户行：" :label-width="formLabelWidth">
                                    <el-input v-model="form.transactionBank" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="交易网点名称：" :label-width="formLabelWidth">
                                    <el-input v-model="form.transactionOutlets" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="交易流水号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.transactionNum" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="交易发生地：" :label-width="formLabelWidth">
                                    <el-input v-model="form.transactionPlace" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="凭证号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.voucherNum" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="终端号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.ending" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="商户名称：" :label-width="formLabelWidth">
                                    <el-input v-model="form.business" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="IP地址：" :label-width="formLabelWidth">
                                    <el-input v-model="form.ip" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="MAC地址：" :label-width="formLabelWidth">
                                    <el-input v-model="form.mac" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="数据上传时间：" :label-width="formLabelWidth">
                                    <el-input v-model="form.createDate" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td></td>
                        </tr>
                    </table>
                

                </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
            
        </div>
    </div>
</template>


<script>

import { Message } from 'element-ui';
export default {
    data(){
        return{
            options: [{
                value: '',
                label: '全部'
                }, {
                value: '贷',
                label: '转入'
                }, {
                value: '借',
                label: '转出'
                },
            ],
            sele: {
                account: this.$route.params.id.account,
                toAccount:"",
                toName:"",
                borrowFlag:"",
                minMoney:"",
                maxMoney:"",
                transactionDateStrEnd:"",
                transactionDateStrStart:"",
            },
            dialogFormVisible: false,
            tableData: [],
            form: {
                id:'',
                account: '',
                toName:'',
                toAccount:'',
                money:'',
                balance:'',
                transactionResult:'',
                transactionDate:'',
                remark:'',
                statustr:'',
                borrowFlag:'',
                transactionType:'',
                transactionBank:'',
                transactionOutlets:'',
                transactionNum:'',
                transactionPlace:'',
                voucherNum:'',
                ending:'',
                business:'',
                ip:'',
                mac:'',
                createDate:''
            },
            formLabelWidth: '120px'
        }

    },created:function(){
        var datas = [];
         this.$axios.post('http://192.168.100.116:8080/project/selectBankFlowList',
            {projectId:this.$route.params.id.projectId,
            account:this.$route.params.id.account,})
            .then((response)=>{
                console.log(response);
                for(let k=0;k<response.data.length;k++){
                        var obj={};
                        obj.id = response.data[k].id;
                        obj.projectId = response.data[k].projectId;
                        obj.name = this.$route.params.id.name;
                        obj.instructions = this.$route.params.id.instructions;
                        obj.account = response.data[k].account;
                        obj.toName = response.data[k].toName;
                        obj.toAccount = response.data[k].toAccount;
                        obj.money = Math.abs(response.data[k].money);
                        obj.balance = response.data[k].balance;
                        obj.transactionResult = response.data[k].transactionResult;
                        obj.transactionDate = response.data[k].transactionDate;
                        obj.remark = response.data[k].remark;
                        if("借"==response.data[k].borrowFlag){
                            obj.borrowFlag = "转出";
                        }else if("贷"==response.data[k].borrowFlag){
                            obj.borrowFlag = "转入";
                        }
                        obj.transactionType = response.data[k].transactionType;
                        obj.transactionBank = response.data[k].transactionBank;
                        obj.transactionOutlets = response.data[k].transactionOutlets;
                        obj.transactionNum = response.data[k].transactionNum;
                        obj.transactionPlace = response.data[k].transactionPlace;
                        obj.voucherNum = response.data[k].voucherNum;
                        obj.ending = response.data[k].ending;
                        obj.business = response.data[k].business;
                        obj.ip = response.data[k].ip;
                        obj.mac = response.data[k].mac;
                        obj.createDate = response.data[k].createDate;
                        datas[k] = obj;
                    }
                    this.tableData = datas;
            }).catch(function(err){
                Message.error(err);
            });   
    },
    methods:{
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 1) {
            return 'warning-row';
            } 
            return '';
        },
        tableCellClassName({row, column, rowIndex, columnIndex}) {
            var text = this.data_list[rowIndex][column.property];
            if(text.lastIndexOf("--")!=-1){
                if(text.substring(0,text.lastIndexOf("--")-2)>5000 && text.substring(text.lastIndexOf("--")+2,text.length-1)>10){
                    return 'warning-all-cell';
                }else if(text.substring(0,text.lastIndexOf("--")-2)>5000){
                    return 'warning-cell';
                }else if(text.substring(text.lastIndexOf("--")+2,text.length-1)>10){
                    return 'warning-count-cell';
                }
            }
            return '';

        },
        goBack:function(){
            this.$route.params.id.id = this.$route.params.id.projectId;
            this.$router.push({name:'bankInitialNode',params:{id:this.$route.params.id}});
        },
        selectProjectBankFlow:function(){
         var datas = [];
         this.$axios.post('http://192.168.100.116:8080/project/selectBankFlowList',
            {
                projectId:this.$route.params.id.projectId,
                account:this.sele.account.length>0?this.sele.account:this.$route.params.id.account,
                toAccount:this.sele.toAccount,
                toName:this.sele.toName,
                borrowFlag:this.sele.borrowFlag,
                maxMoney:this.sele.maxMoney,
                minMoney:this.sele.minMoney,
                transactionDateStrStart:this.sele.transactionDateStrStart,
                transactionDateStrEnd:this.sele.transactionDateStrEnd,
            }).then((response)=>{
                console.log(response);
                for(let k=0;k<response.data.length;k++){
                        var obj={};
                        obj.id = response.data[k].id;
                        obj.projectId = response.data[k].projectId;
                        obj.name = this.$route.params.id.name;
                        obj.instructions = this.$route.params.id.instructions;
                        obj.account = response.data[k].account;
                        obj.toName = response.data[k].toName;
                        obj.toAccount = response.data[k].toAccount;
                        obj.money = Math.abs(response.data[k].money);
                        obj.balance = response.data[k].balance;
                        obj.transactionResult = response.data[k].transactionResult;
                        obj.transactionDate = response.data[k].transactionDate;
                        obj.remark = response.data[k].remark;
                        if("借"==response.data[k].borrowFlag){
                            obj.borrowFlag = "转出";
                        }else if("贷"==response.data[k].borrowFlag){
                            obj.borrowFlag = "转入";
                        }
                        obj.transactionType = response.data[k].transactionType;
                        obj.transactionBank = response.data[k].transactionBank;
                        obj.transactionOutlets = response.data[k].transactionOutlets;
                        obj.transactionNum = response.data[k].transactionNum;
                        obj.transactionPlace = response.data[k].transactionPlace;
                        obj.voucherNum = response.data[k].voucherNum;
                        obj.ending = response.data[k].ending;
                        obj.business = response.data[k].business;
                        obj.ip = response.data[k].ip;
                        obj.mac = response.data[k].mac;
                        obj.createDate = response.data[k].createDate;
                        datas[k] = obj;
                    }
                    this.tableData = datas;
            }).catch(function(err){
                Message.error(err);
            }); 
        },
        handleView(index, row) {
            this.dialogFormVisible=true;
            this.form.account=row.account;
            this.form.toName=row.toName;
            this.form.toAccount=row.toAccount;
            this.form.money=row.money;
            this.form.balance=row.balance;
            this.form.borrowFlag=row.borrowFlag;
            this.form.transactionType=row.transactionType;
            this.form.transactionResult=row.transactionResult;
            this.form.transactionDate=row.transactionDate;
            this.form.transactionBank=row.transactionBank;
            this.form.transactionOutlets=row.transactionOutlets;
            this.form.transactionNum=row.transactionNum;
            this.form.transactionPlace=row.transactionPlace;
            this.form.voucherNum=row.voucherNum;
            this.form.ending=row.ending;
            this.form.business=row.business;
            this.form.ip=row.ip;
            this.form.mac=row.mac;
            this.form.createDate=row.createDate;
            this.form.statustr=row.statustr;
            this.form.remark=row.remark;

        }
    }
}
</script>

