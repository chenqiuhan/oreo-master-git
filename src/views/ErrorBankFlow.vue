<template>
    <div>
        <el-button type="info" plain class="el-icon-arrow-left"  @click="goBack()">返回</el-button>
        <div>
            <h3>项目名称：{{$route.params.id.name}}</h3>
        </div>
        <el-table
            :row-class-name="tableRowClassName"
            :data="tableData"
            height="720"
            style="width: 100%">

            <el-table-column
            prop="account"
            label="查询账号"
            width="200"
            align="center"
            >
            
            </el-table-column>
            <el-table-column
            prop="toName"
            label="对方账号姓名"
            width="130"
            align="center">
            
            </el-table-column>
            <el-table-column
            label="对方账号卡号"
            width="250"
            align="center"
            prop="toAccount">
            </el-table-column>
            <el-table-column
            prop="money"
            label="金额"
            width="100"
            align="center">
            
            </el-table-column>
            <el-table-column
            prop="balance"
            label="余额"
            width="100"
            align="center">
            
            </el-table-column>
            <el-table-column
            prop="transactionResult"
            label="交易结果"
            width="100"
            align="center">
            
            </el-table-column>
            <el-table-column
            prop="transactionDate"
            label="交易时间"
            width="200"
            align="center">
            
            </el-table-column>
            <el-table-column
            prop="remark"
            label="错误信息"
            width="200"
            align="center">
            
            </el-table-column>
            
            <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleView(scope.$index, scope.row)">详情</el-button>
                <router-link :to="{name:'updateBankFlow',params:{id:scope.row,type:'errorBankFlow'}}">
                    <el-button size="mini" >修改</el-button>

                </router-link>
                
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div>
            <el-dialog title="项目流水详情" :visible.sync="dialogFormVisible">
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
                            <td style="width:50%;padding-left: 60px;">
                                <el-form-item label="数据上传状态：" :label-width="formLabelWidth">
                                    <el-input v-model="form.statustr" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:50%;">
                                <el-form-item label="数据状态说明：" :label-width="formLabelWidth">
                                    <el-input v-model="form.remark" :disabled="true"></el-input>
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

</template>

<style>
  .el-table .warning-row {
    background: rgb(219, 219, 218);
  }

  .el-table .success-row {
    background: #95fad8;
  }
</style>

<script>
import { Message } from 'element-ui';
export default {
    data() {
      return {
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
        sele: {
          name: ''
        },
        formLabelWidth: '120px'
      }
    },created:function(){
       var datas=[];
       let _this = this;
       this.$axios.post('http://192.168.100.116:8080/project/selectAllBankFlowByProject',{
           projectId:this.$route.params.id.id,
           status:2
       })
          .then((response)=>{
              for(let k=0;k<response.data.length;k++){
                var obj={};
                obj.id = response.data[k].id;
                obj.projectId = response.data[k].projectId;
                obj.name = this.$route.params.id.name;
                obj.instructions = this.$route.params.id.instructions;
                obj.account = response.data[k].account;
                obj.toName = response.data[k].toName;
                obj.toAccount = response.data[k].toAccount;
                obj.money = response.data[k].money;
                obj.balance = response.data[k].balance;
                obj.transactionResult = response.data[k].transactionResult;
                obj.transactionDate = response.data[k].transactionDate;
                obj.remark = response.data[k].remark;
                obj.borrowFlag = response.data[k].borrowFlag;
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
              _this.tableData=datas;
          }).catch(function(err){
              Message.error(error);
          });
    },
    methods:{
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 1) {
            return 'warning-row';
            } 
            return '';
        },
        goBack(){
            this.$router.push({name:'projectInfo',params:{id:this.$route.params.id}});
        },
        handleDelete:function(index,row){
            var confirmMsg="此操作将永久删除该条项目流水信息, 是否继续？";
            
            this.$confirm(confirmMsg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$axios.delete('http://192.168.100.116:8080/project/deleteBankFlowById/'+row.id)
                .then((response)=>{
                    Message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //更新数据
                    var datas=[];
                    let _this = this;
                    this.$axios.post('http://192.168.100.116:8080/project/selectAllBankFlowByProject',{
                        projectId:this.$route.params.id.id,
                        status:2
                    })
                        .then((response)=>{
                            for(let k=0;k<response.data.length;k++){
                                var obj={};
                                obj.id = response.data[k].id;
                                obj.projectId = response.data[k].projectId;
                                obj.name = this.$route.params.id.name;
                                obj.instructions = this.$route.params.id.instructions;
                                obj.account = response.data[k].account;
                                obj.toName = response.data[k].toName;
                                obj.toAccount = response.data[k].toAccount;
                                obj.money = response.data[k].money;
                                obj.balance = response.data[k].balance;
                                obj.transactionResult = response.data[k].transactionResult;
                                obj.transactionDate = response.data[k].transactionDate;
                                obj.remark = response.data[k].remark;
                                obj.status = response.data[k].status;
                                if(0==response.data[k].status){
                                    obj.statustr = '数据未校验';
                                }else if(1==response.data[k].status){
                                    obj.statustr = '成功';
                                }else if(2==response.data[k].status){
                                    obj.statustr = '失败';
                                }
                                obj.borrowFlag = response.data[k].borrowFlag;
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
                            _this.tableData=datas;
                        }).catch(function(err){
                            Message.error(err);
                        });
                        });
                
            }).catch(()=>{
                Message({
                    type: 'info',
                    message: '已取消删除'
                });          
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
