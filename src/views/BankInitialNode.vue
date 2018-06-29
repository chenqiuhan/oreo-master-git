<template>
    <div>
        <el-button type="info" plain class="el-icon-arrow-left"  @click="goBack()">返回</el-button>
        <div>
            <h3>项目名称：{{$route.params.id.name}}</h3>
            <div style="height:50px;">
                <el-form ref="form" :model="sele">
                    <el-form-item>
                    <span style="color:red;">请选择初始节点账号进行数据分析</span>
                    <span style="width:50px;" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input v-model="sele.account" style="width:300px;"  placeholder="请输入查询账号" maxlength="40"></el-input>
                    <span style="width:50px;" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-button type="primary" icon="el-icon-search" @click="selectProjectBankFlow">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            
            
            
        </div>
        <el-table
            :row-class-name="tableRowClassName"
            :data="tableData"
            height="630"
            style="width: 100%">

            <el-table-column
                prop="account"
                label="查询账号"
                width="500"
                align="center"
            >
            </el-table-column>
            <el-table-column
            prop="status"
            label="转账次数"
            width="330"
            align="center">
            
            </el-table-column>
            <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <router-link :to="{name:'showData',params:{id:scope.row}}">
                    <el-button size="mini" type="primary" plain>数据分析</el-button>
                </router-link>
                <router-link :to="{name:'bankShowTable',params:{id:scope.row}}">
                    <el-button size="mini" type="primary" plain>资金转出统计</el-button>
                </router-link>
                <router-link :to="{name:'bankDataList',params:{id:scope.row}}">
                    <el-button size="mini" type="primary" plain>数据明细列表</el-button>
                </router-link>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style>
  .el-table .warning-row {
    background: rgb(219, 219, 218);
  }
</style>

<script>

import { Message } from 'element-ui';
export default {
    data(){
        return{
            tableData: [],
            sele: {
                account: ''
            }
        }
    },created:function(){
        var datas=[];
        let _this = this;
        this.$axios.post('http://192.168.100.116:8080/project/bankInitialNode',{
            projectId:this.$route.params.id.id,
            account : this.sele.account
        })
            .then((response)=>{
                for(let k=0;k<response.data.length;k++){
                    var obj={};
                    obj.projectId = response.data[k].projectId;
                    obj.name = this.$route.params.id.name;
                    obj.instructions = this.$route.params.id.instructions;
                    obj.account = response.data[k].account;
                    obj.status = response.data[k].status;
                    obj.transactionDate = response.data[k].transactionDate;
                    datas[k] = obj;
                }
                _this.tableData=datas;
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
        goBack:function(){
            this.$router.push({name:'projectInfo',params:{id:this.$route.params.id}});
        },
        selectProjectBankFlow:function(){
            var datas=[];
            let _this = this;
            var r = /^\+?[1-9][0-9]*$/;  //判断是否是正整数
            if(this.sele.account.length>0){
                if(!r.test(this.sele.account) ){
                    Message.error("帐号格式不正确");
                    return false;
                }
            }
            this.$axios.post('http://192.168.100.116:8080/project/bankInitialNode',{
                projectId:this.$route.params.id.id,
                account : this.sele.account
            })
                .then((response)=>{
                    for(let k=0;k<response.data.length;k++){
                        var obj={};
                        obj.projectId = response.data[k].projectId;
                        obj.name = this.$route.params.id.name;
                        obj.account = response.data[k].account;
                        obj.status = response.data[k].status;
                        obj.transactionDate = response.data[k].transactionDate;
                        datas[k] = obj;
                    }
                    _this.tableData=datas;
                }).catch(function(err){
                    Message.error(err);
                });
        }
    }
}
</script>
