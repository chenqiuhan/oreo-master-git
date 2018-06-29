<template>
        <el-form :model="form" >
            <table style="width:1200px;">
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="查询账号:" :label-width="formLabelWidth">
                            <el-input v-model="form.account" ></el-input>
                        </el-form-item>
                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="对方账号姓名:" :label-width="formLabelWidth">
                            <el-input v-model="form.toName" ></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="对方账号:" :label-width="formLabelWidth">
                            <el-input  v-model="form.toAccount" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="金额:" :label-width="formLabelWidth">
                            <el-input  v-model="form.money" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">

                        <el-form-item label="余额:" :label-width="formLabelWidth">
                            <el-input  v-model="form.balance" ></el-input>
                        </el-form-item>
                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        
                        <el-form-item label="借贷标志:" :label-width="formLabelWidth">
                            <el-input v-model="form.borrowFlag" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">

                        <el-form-item label="交易类型:" :label-width="formLabelWidth">
                            <el-input v-model="form.transactionType" ></el-input>
                        </el-form-item>
                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易结果:" :label-width="formLabelWidth">
                            <el-input v-model="form.transactionResult" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易时间:" :label-width="formLabelWidth">
                            <el-input v-model="form.transactionDate" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易开户行:" :label-width="formLabelWidth">
                            <el-input v-model="form.transactionBank" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易网点名称:" :label-width="formLabelWidth">
                            <el-input v-model="form.transactionOutlets" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易流水号:" :label-width="formLabelWidth">
                            <el-input v-model="form.transactionNum" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易发生地:" :label-width="formLabelWidth">
                            <el-input v-model="form.transactionPlace" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="凭证号:" :label-width="formLabelWidth">
                            <el-input v-model="form.voucherNum" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="终端号:" :label-width="formLabelWidth">
                            <el-input v-model="form.ending" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="商户名称:" :label-width="formLabelWidth">
                            <el-input v-model="form.business" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="IP地址:" :label-width="formLabelWidth">
                            <el-input v-model="form.ip" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="MAC地址:" :label-width="formLabelWidth">
                            <el-input v-model="form.mac" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="text-align:right"><el-button type="primary" @click="goBack()">返  回</el-button></td>
                    <td style="padding-left: 200px;"><el-button type="success" @click="onSubmit()" >保  存</el-button></td>
                </tr>
            </table>
            

        </el-form>
</template>

<script>
import { Message } from 'element-ui';
export default {
    data() {
      return {
         form: {
          id : this.$route.params.id.id,
          projectId : this.$route.params.id.projectId,
          account : this.$route.params.id.account,
          toName : this.$route.params.id.toName,
          toAccount : this.$route.params.id.toAccount,
          money : this.$route.params.id.money,
          balance : this.$route.params.id.balance,
          transactionResult : this.$route.params.id.transactionResult,
          transactionDate : this.$route.params.id.transactionDate,
          remark : this.$route.params.id.remark,
          statustr : this.$route.params.id.statustr,
          borrowFlag : this.$route.params.id.borrowFlag,
          transactionType : this.$route.params.id.transactionType,
          transactionBank : this.$route.params.id.transactionBank,
          transactionOutlets : this.$route.params.id.transactionOutlets,
          transactionNum : this.$route.params.id.transactionNum,
          transactionPlace : this.$route.params.id.transactionPlace,
          voucherNum : this.$route.params.id.voucherNum,
          ending : this.$route.params.id.ending,
          business : this.$route.params.id.business,
          ip : this.$route.params.id.ip,
          mac : this.$route.params.id.mac,
          createDate : this.$route.params.id.createDate
        },
        formLabelWidth: '120px'
      }
    },
    methods:{
        goBack:function(){
            var id = this.$route.params.id.projectId;
            this.$route.params.id.id = id;
            this.$router.push({name:this.$route.params.type,params:{id:this.$route.params.id}});
        },
        onSubmit() {
            this.$axios.post('http://192.168.100.116:8080/project/updateBankFlow', {
                id : this.form.id,
                projectId : this.form.projectId,
                account : this.form.account,
                toName : this.form.toName,
                toAccount : this.form.toAccount,
                money : this.form.money,
                balance : this.form.balance,
                transactionResult : this.form.transactionResult,
                transactionDate : this.form.transactionDate,
                remark : this.form.remark,
                statustr : this.form.statustr,
                borrowFlag : this.form.borrowFlag,
                transactionType : this.form.transactionType,
                transactionBank : this.form.transactionBank,
                transactionOutlets : this.form.transactionOutlets,
                transactionNum : this.form.transactionNum,
                transactionPlace : this.form.transactionPlace,
                voucherNum : this.form.voucherNum,
                ending : this.form.ending,
                business : this.form.business,
                ip : this.form.ip,
                mac : this.form.mac
            })
            .then(function (response) {
            if(response.status==200){
                Message({
                message: '提交成功！',
                type: 'success'
                });
            }else{
                Message.error('错了哦，这是一条错误消息');
            }
            })
            .catch(function (error) {
            Message.error(error);
            });
        }
    }
}
</script>
