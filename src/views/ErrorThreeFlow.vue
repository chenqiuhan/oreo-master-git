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
            prop="transactionNum"
            label="交易流水号"
            width="300"
            align="center"
            
            >
            
            </el-table-column>
            <el-table-column
            prop="payAccount"
            label="付款支付账号"
            width="150"
            align="center">
            
            </el-table-column>
            <el-table-column
            label="收款支付账号"
            width="250"
            align="center"
            prop="receiveAccount">
            </el-table-column>
            <el-table-column
            prop="money"
            label="金额"
            width="100"
            align="center">
            
            </el-table-column>
            
            <el-table-column
            prop="transactionType"
            label="交易类型"
            width="200"
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
            width="150"
            align="center">
            
            </el-table-column>
            
            <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleView(scope.$index, scope.row)">详情</el-button>
                <router-link :to="{name:'updateThreeFlow',params:{id:scope.row,type:'errorThreeFlow'}}">
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
            <el-dialog title="第三方（支付宝/财付通）流水详情" :visible.sync="dialogFormVisible" width="63%">
                <el-form :model="form" >
                    <table  style="height:50px;width:98%;">
                        <tr >
                            <td style="width:48%;">
                                <el-form-item label="交易流水号：" :label-width="formLabelWidth">
                                <el-input v-model="form.transactionNum" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="付款支付账号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.payAccount" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="付款银行卡银行名称：" :label-width="formLabelWidth">
                                    <el-input  v-model="form.payBank" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="付款银行卡号：" :label-width="formLabelWidth">
                                    <el-input  v-model="form.payBankNum" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="交易金额：" :label-width="formLabelWidth">
                                    <el-input  v-model="form.money" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="交易余额：" :label-width="formLabelWidth">
                                    <el-input v-model="form.balance" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="收款支付账号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.receiveAccount" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="收款银行卡银行名称：" :label-width="formLabelWidth">
                                    <el-input v-model="form.receiveBank" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="收款银行卡号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.receiveBankNum" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="交易类型：" :label-width="formLabelWidth">
                                    <el-input v-model="form.transactionType" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="交易时间：" :label-width="formLabelWidth">
                                    <el-input v-model="form.transactionDate" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="支付类型：" :label-width="formLabelWidth">
                                    <el-input v-model="form.payType" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="交易主体的出入账标识：" :label-width="formLabelWidth">
                                    <el-input v-model="form.outIn" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="币种：" :label-width="formLabelWidth">
                                    <el-input v-model="form.moneyType" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="消费pos机编号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.posNum" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="收款方的商户号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.business" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="交易设备类型：" :label-width="formLabelWidth">
                                    <el-input v-model="form.equipment" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="交易设备号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.equipmentNum" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="交易支付设备ip：" :label-width="formLabelWidth">
                                    <el-input v-model="form.ip" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="MAC地址：" :label-width="formLabelWidth">
                                    <el-input v-model="form.mac" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="交易地点经度：" :label-width="formLabelWidth">
                                    <el-input v-model="form.longitude" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="交易地点纬度：" :label-width="formLabelWidth">
                                    <el-input v-model="form.latitude" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="银行外部渠道交易流水号：" :label-width="formLabelWidth">
                                    <el-input v-model="form.bankTransactionNum" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="备注：" :label-width="formLabelWidth">
                                    <el-input v-model="form.note" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
                                <el-form-item label="数据上传时间：" :label-width="formLabelWidth">
                                    <el-input v-model="form.createDate" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                            <td style="width:52%;padding-left: 30px;">
                                <el-form-item label="数据上传状态：" :label-width="formLabelWidth">
                                    <el-input v-model="form.statustr" :disabled="true"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:48%;">
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
         transactionNum: '',
          payAccount:'',
          payBank:'',
          payBankNum:'',
          money:'',
          balance:'',
          receiveAccount:'',
          receiveBank:'',
          receiveBankNum:'',
          transactionType:'',
          transactionDate:'',
          payType:'',
          outIn:'',
          moneyType:'',
          posNum:'',
          business:'',
          equipment:'',
          equipmentNum:'',
          ip:'',
          mac:'',
          longitude:'',
          latitude:'',
          bankTransactionNum:'',
          note:'',
          createDate:''
        },
        sele: {
          name: ''
        },
        formLabelWidth: '180px'
      }
    },created:function(){
       var datas=[];
       let _this = this;
       this.$axios.post('http://192.168.100.116:8080/project/selectAllThreeFlowByProject',{
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
                        obj.transactionNum = response.data[k].transactionNum;
                        obj.payAccount = response.data[k].payAccount;
                        obj.payBank = response.data[k].payBank;
                        obj.payBankNum = response.data[k].payBankNum;
                        obj.money = response.data[k].money;
                        obj.balance = response.data[k].balance;
                        obj.receiveAccount = response.data[k].receiveAccount;
                        obj.receiveBank = response.data[k].receiveBank;
                        obj.receiveBankNum = response.data[k].receiveBankNum;
                        obj.transactionType = response.data[k].transactionType;
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
                        obj.business = response.data[k].business;
                        obj.ip = response.data[k].ip;
                        obj.mac = response.data[k].mac;
                        obj.createDate = response.data[k].createDate;
                        obj.payType = response.data[k].payType;
                        obj.outIn = response.data[k].outIn;
                        obj.moneyType = response.data[k].moneyType;
                        obj.posNum = response.data[k].posNum;
                        obj.equipment = response.data[k].equipment;
                        obj.longitude = response.data[k].longitude;
                        obj.latitude = response.data[k].latitude;
                        obj.equipmentNum = response.data[k].equipmentNum;
                        obj.bankTransactionNum = response.data[k].bankTransactionNum;
                        obj.note = response.data[k].note;
                        datas[k] = obj;
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
                this.$axios.delete('http://192.168.100.116:8080/project/deleteThreeFlowById/'+row.id)
                .then((response)=>{
                    Message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //更新数据
                    var datas=[];
                    let _this = this;
                    this.$axios.post('http://192.168.100.116:8080/project/selectAllThreeFlowByProject',{
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
                                obj.transactionNum = response.data[k].transactionNum;
                                obj.payAccount = response.data[k].payAccount;
                                obj.payBank = response.data[k].payBank;
                                obj.payBankNum = response.data[k].payBankNum;
                                obj.money = response.data[k].money;
                                obj.balance = response.data[k].balance;
                                obj.receiveAccount = response.data[k].receiveAccount;
                                obj.receiveBank = response.data[k].receiveBank;
                                obj.receiveBankNum = response.data[k].receiveBankNum;
                                obj.transactionType = response.data[k].transactionType;
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
                                obj.business = response.data[k].business;
                                obj.ip = response.data[k].ip;
                                obj.mac = response.data[k].mac;
                                obj.createDate = response.data[k].createDate;
                                obj.payType = response.data[k].payType;
                                obj.outIn = response.data[k].outIn;
                                obj.moneyType = response.data[k].moneyType;
                                obj.posNum = response.data[k].posNum;
                                obj.equipment = response.data[k].equipment;
                                obj.longitude = response.data[k].longitude;
                                obj.latitude = response.data[k].latitude;
                                obj.equipmentNum = response.data[k].equipmentNum;
                                obj.bankTransactionNum = response.data[k].bankTransactionNum;
                                obj.note = response.data[k].note;
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
            this.dialogFormVisible=true;
            this.form.transactionNum = row.transactionNum;
            this.form.payAccount = row.payAccount;
            this.form.payBank = row.payBank;
            this.form.payBankNum = row.payBankNum;
            this.form.money=row.money;
            this.form.balance=row.balance;
            this.form.receiveAccount = row.receiveAccount;
            this.form.receiveBank = row.receiveBank;
            this.form.receiveBankNum = row.receiveBankNum;
            this.form.transactionType=row.transactionType;
            this.form.transactionDate=row.transactionDate;
            this.form.payType = row.payType;
            this.form.outIn = row.outIn;
            this.form.moneyType = row.moneyType;
            this.form.posNum = row.posNum;
            this.form.business=row.business;
            this.form.equipment = row.equipment;
            this.form.ip=row.ip;
            this.form.mac=row.mac;
            this.form.longitude = row.longitude;
            this.form.latitude = row.latitude;
            this.form.equipmentNum = row.equipmentNum;
            this.form.bankTransactionNum = row.bankTransactionNum;
            this.form.note = row.note;
            this.form.createDate=row.createDate;
            this.form.statustr=row.statustr;
            this.form.remark=row.remark;

        }
    }   
}
</script>
