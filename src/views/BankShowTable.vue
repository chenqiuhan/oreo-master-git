<template>
    <div>
        <el-button type="info" plain class="el-icon-arrow-left"  @click="goBack()">返回</el-button>
        <div>
            <div >
                </br>
                <span style="width:50px;font-size:20px;" >项目名称：{{$route.params.id.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red;font-size:15px;">(项目数据起始时间：{{dataStart}})</span></span>
                </br></br>
                <span style="width:50px;font-size:20px;" >查询帐号：</span>
                <div id="accountList" style="font-size:20px;color:purple;" width="500">
                    <a v-for="(account,index) in accounts" :key="index" v-on:click="searchAccount(account)" >
                        {{account}}
                        <span v-if="(index+1)/5===0"></br></span>
                        <span v-else>&nbsp;&nbsp;</span>
                    </a>
                </div>

            </div>
            <el-form ref="form" :model="sele">
                <el-form-item>
                <el-input v-model="sele.account" style="width:200px;"  placeholder="请输入账号" maxlength="30"></el-input>
                <span style="width:50px;" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-date-picker
                    v-model="sele.transactionDate"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择开始时间">
                    </el-date-picker>
                    <span style="width:50px;" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input v-model="sele.intervals" style="width:200px;"  placeholder="请输入间隔时间(小时)" maxlength="3"></el-input>
                    <span style="width:50px;" >小时&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input v-model="sele.level" style="width:200px;"  placeholder="请输入展示级数" maxlength="3"></el-input>
                    <span style="width:50px;" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button type="primary" icon="el-icon-search" @click="showData()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table 
                :data="data_list" 
                :row-class-name="tableRowClassName"
                :cell-class-name="tableCellClassName"
                @cell-click="showInfo" 
                @header-click="headerClick"
                show-summary
                :summary-method="getSummaries"
                style="width: 100%;" 
                height="550">
                    <el-table-column
                        fixed
                        prop="时间"
                        label="时  间"
                        width="200"
                        align="center">
                        
                        </el-table-column>
                    <el-table-column label="对方账号" align="center">
                        <el-table-column  :label="head.toAccount+'（'+head.toName+'）'" v-for="head in header" align="center" :key="head.toAccount" :prop="head.toAccount" width="186">
                            <!--
                            <template scope="scope" >
                                <span v-if="data_list[scope.$index][data].substring(data_list[scope.$index][data].lastIndexOf('|')+1)>500" style="color:red;">{{data_list[scope.$index][data]}}</span>
                                <span v-else >{{data_list[scope.$index][data]}}</span>
                                    
                            </template>-->
                        </el-table-column>

                    </el-table-column>

                </el-table>
        </div>
        <div>
            <el-dialog title="银行流水详情" :visible.sync="dialogFormVisible" >
                <el-table
                    :row-class-name="tableRowClassName"
                    :data="tableData"
                    :default-sort = "{prop: 'transactionDate', order: 'ascend'}"
                    height="500"
                    style="width: 950px;">

                    <el-table-column
                        prop="index"
                        label="序号"
                        width="50"
                        align="center"
                    ></el-table-column>

                    <el-table-column
                        prop="account"
                        label="查询账号"
                        width="180"
                        align="center"
                    ></el-table-column>

                    <el-table-column
                        label="对方账号卡号"
                        width="180"
                        align="center"
                        prop="toAccount"
                    ></el-table-column>

                    <el-table-column
                        prop="toName"
                        label="对方账号姓名"
                        width="120"
                        align="center"
                    ></el-table-column>

                    <el-table-column
                        prop="money"
                        label="金额"
                        width="100"
                        align="center"
                        sortable
                    ></el-table-column>

                    <el-table-column
                        prop="balance"
                        label="余额"
                        width="100"
                        align="center"
                    ></el-table-column>


                    <el-table-column
                        prop="transactionDate"
                        label="交易时间"
                        width="180"
                        align="center"
                        sortable
                    ></el-table-column>
                    
                </el-table>
                <div style="float:left;">{{countMsg}}</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{countmsg}}</div>
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
  .el-table .warning-cell {
    color: rgb(252, 8, 61);
  }
  .el-table .warning-count-cell {
    background: rgb(202, 189, 112);
  }
  .el-table .warning-all-cell {
    color: rgb(252, 8, 61);
    background: rgb(202, 189, 112);
  }
</style>
<script>

import { Message } from 'element-ui';
export default {
    data(){
        return{
            header:[],
            data_list:[
            ],
             sele: {
                account: this.$route.params.id.account,
                transactionDate:this.$route.params.id.transactionDate,
                level:8,
                intervals:24
            },
            dataStart:this.$route.params.id.transactionDate,
            dialogFormVisible: false,
            tableData: [],
            accounts:[this.$route.params.id.account],
            countMsg:"",
            countmsg:"",
        }

    },created:function(){
         this.$axios.post('http://192.168.100.116:8080/project/selectBankTablOut',
            {projectId:this.$route.params.id.projectId,
            account:this.$route.params.id.account,})
            .then((response)=>{
                console.log(response);
                this.header = response.data.label;
                this.dataStart = response.data.data[0].时间;
                var lists = [];
                for(var i=0;i<response.data.data.length;i++){
                    var list = response.data.data[i];
                    
                    lists[i] = list;
                }
                this.data_list = lists;
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
        showData:function(){
            //查询按钮查询
            var transactionDateStrStart = this.sele.transactionDate;
            if(transactionDateStrStart==null || transactionDateStrStart=='undefined' || transactionDateStrStart.length<1){
                transactionDateStrStart = null;
            }
            var r = /^\+?[1-9][0-9]*$/;  //判断是否是正整数
            if(this.sele.account.length>0){
                if(!r.test(this.sele.account) ){
                    Message.error("帐号格式不正确");
                    return false;
                }
            }
            if(this.sele.intervals.length>0&&!r.test(this.sele.intervals)){
                Message.error("间隔时间格式不正确");
                return false;
            }
            if(this.sele.level.length>0&&!r.test(this.sele.level)){
                Message.error("展示等级格式不正确");
                return false;
            }
            this.$axios.post('http://192.168.100.116:8080/project/selectBankTablOut',
            {
                projectId:this.$route.params.id.projectId,
                account:this.sele.account.length==0?this.$route.params.id.account:this.sele.account,
                transactionDateStrStart:transactionDateStrStart,
                intervals:this.sele.intervals,
                level:this.sele.level
            }).then((response)=>{
                var lists = [];
                for(var i=0;i<response.data.data.length;i++){
                    var list = response.data.data[i];
                    lists[i] = list;
                }
                this.data_list = lists;
                this.dataStart = response.data.data[0].时间;
                this.header = response.data.label;
            }).catch(function(err){
                Message.error(err);
            });
        },
        showInfo(row, column, cell, event,index){
            //转账详情
            var r = /^\+?[1-9][0-9]*$/;
            if(!r.test(column.property)){
                return false;
            }
            var datas=[];
            var intervals = this.sele.intervals.length==0?24:this.sele.intervals;

            this.$axios.post('http://192.168.100.116:8080/project/selectBankOutInfo',
                {
                    projectId:this.$route.params.id.projectId,
                    account:this.sele.account.length==0?this.$route.params.id.account:this.sele.account,
                    toAccount:column.property,
                    transactionDateStrStart:row.时间,
                    level:1,
                    intervals:intervals,

                }).then((response)=>{
                    var totalMoney = 0;
                    for(let k=0;k<response.data.length;k++){
                        var obj={};
                        obj.index = k+1;
                        obj.account = response.data[k].account;
                        obj.toAccount = response.data[k].toAccount;
                        obj.toName = response.data[k].toName;
                        obj.balance = response.data[k].balance;
                        obj.transactionDate = response.data[k].transactionDate;
                        obj.money = Math.abs(response.data[k].money);
                        totalMoney+=obj.money;
                        datas[k] = obj;
                    }
                    if(response.data.length>0){
                        this.countMsg="总计：查询帐号："+response.data[0].account+"    向对方账号："+response.data[0].toAccount+"  ( "+response.data[0].toName+" )";
                        this.countmsg="转账 "+response.data.length+" 次，共计 "+totalMoney+" 元，转账时间为："+response.data[0].transactionDate+" 至 "+response.data[response.data.length-1].transactionDate+"。";
                    }
                    this.tableData = datas;
                    this.dialogFormVisible=true;

                }).catch(function(err){
                    Message.error(err);
                });
        },
        headerClick(column, event){
            var r = /^\+?[1-9][0-9]*$/;
            if(!r.test(column.property)){
                return false;
            }
            this.sele.account = column.property;
            this.accounts[this.accounts.length] = column.property;
            var transactionDateStrStart = this.sele.transactionDate;
            if(transactionDateStrStart==null || transactionDateStrStart=='undefined' || transactionDateStrStart.length<1){
                transactionDateStrStart = null;
            }
            this.$axios.post('http://192.168.100.116:8080/project/selectBankTablOut',
            {
                projectId:this.$route.params.id.projectId,
                account:column.property,
                transactionDateStrStart:transactionDateStrStart,
                intervals:this.sele.intervals,
                level:this.sele.level
            }).then((response)=>{
                var lists = [];
                for(var i=0;i<response.data.data.length;i++){
                    var list = response.data.data[i];
                    lists[i] = list;
                }
                this.data_list = lists;
                this.dataStart = response.data.data[0].时间;
                this.header = response.data.label;
            }).catch(function(err){
                Message.error(err);
            });
        },
        searchAccount(e){
            this.accounts.splice(this.accounts.indexOf(e)+1,this.accounts.length-this.accounts.indexOf(e)-1);
            this.sele.account = e;
            var transactionDateStrStart = this.sele.transactionDate;
            if(transactionDateStrStart==null || transactionDateStrStart=='undefined' || transactionDateStrStart.length<1){
                transactionDateStrStart = null;
            }
            this.$axios.post('http://192.168.100.116:8080/project/selectBankTablOut',
            {
                projectId:this.$route.params.id.projectId,
                account:e,
                transactionDateStrStart:transactionDateStrStart,
                intervals:this.sele.intervals,
                level:this.sele.level
            }).then((response)=>{
                var lists = [];
                for(var i=0;i<response.data.data.length;i++){
                    var list = response.data.data[i];
                    lists[i] = list;
                }
                this.data_list = lists;
                this.dataStart = response.data.data[0].时间;
                this.header = response.data.label;
            }).catch(function(err){
                Message.error(err);
            });
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总  计';
                    return;
                }
                const values = data.map(item => item[column.property]);
                const sum1 = values.reduce((prev, curr) => {
                    curr = parseFloat(curr.substring(0,curr.lastIndexOf("--")-2));  //转账金额
                    console.log("curr1:");
                    console.log(curr);
                    if (!isNaN(curr)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                }, 0);
                const sum2 = values.reduce((prev, curr) => {
                    curr = parseFloat(curr.substring(curr.lastIndexOf("--")+2,curr.length-1));  //转账次数
                    if (!isNaN(curr)) {
                    return prev + curr;
                    } else {
                    return prev;
                    }
                }, 0); 
                sums[index] = sum1+"元 -- "+sum2+"次";
            });

        return sums;
      }
        
    }
}
</script>
