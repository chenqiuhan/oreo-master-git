<template>
        <el-form :model="form" >
            <table style="width:1200px;">
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易流水号:" :label-width="formLabelWidth" >
                            <el-input v-model="form.transactionNum" ></el-input>
                        </el-form-item>
                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="付款支付账号:" :label-width="formLabelWidth">
                            <el-input v-model="form.payAccount" ></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="付款银行卡银行名称:" :label-width="formLabelWidth">
                            <el-input  v-model="form.payBank" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="付款银行卡号:" :label-width="formLabelWidth">
                            <el-input  v-model="form.payBankNum" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">

                        <el-form-item label="交易金额:" :label-width="formLabelWidth">
                            <el-input  v-model="form.money" ></el-input>
                        </el-form-item>
                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        
                        <el-form-item label="交易余额:" :label-width="formLabelWidth">
                            <el-input v-model="form.balance" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">

                        <el-form-item label="收款支付账号:" :label-width="formLabelWidth">
                            <el-input v-model="form.receiveAccount" ></el-input>
                        </el-form-item>
                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="收款银行卡银行名称:" :label-width="formLabelWidth">
                            <el-input v-model="form.receiveBank" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="收款银行卡号:" :label-width="formLabelWidth">
                            <el-input v-model="form.receiveBankNum" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易类型:" :label-width="formLabelWidth">
                            <el-input v-model="form.transactionType" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易时间:" :label-width="formLabelWidth">
                            <el-date-picker
                                v-model="form.transactionDate"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间">
                                </el-date-picker>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="支付类型:" :label-width="formLabelWidth">
                            <el-input v-model="form.payType" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易主体的出入账标识:" :label-width="formLabelWidth">
                            <el-input v-model="form.outIn" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="币种:" :label-width="formLabelWidth">
                            <el-input v-model="form.moneyType" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="消费pos机编号:" :label-width="formLabelWidth">
                            <el-input v-model="form.posNum" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="收款方的商户号:" :label-width="formLabelWidth">
                            <el-input v-model="form.business" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易设备类型:" :label-width="formLabelWidth">
                            <el-input v-model="form.equipment" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易设备号:" :label-width="formLabelWidth">
                            <el-input v-model="form.equipmentNum" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易支付设备ip:" :label-width="formLabelWidth">
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
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易地点经度:" :label-width="formLabelWidth">
                            <el-input v-model="form.longitude" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="交易地点纬度:" :label-width="formLabelWidth">
                            <el-input v-model="form.latitude" ></el-input>
                        </el-form-item>

                    </td>
                </tr>
                <tr>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="银行外部渠道交易流水号:" :label-width="formLabelWidth">
                            <el-input v-model="form.bankTransactionNum" ></el-input>
                        </el-form-item>

                    </td>
                    <td style="width:50%;padding-left: 100px;">
                        <el-form-item label="备注:" :label-width="formLabelWidth">
                            <el-input v-model="form.note" ></el-input>
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
          transactionNum : this.$route.params.id.transactionNum,
          payAccount : this.$route.params.id.payAccount,
          payBank : this.$route.params.id.payBank,
          payBankNum : this.$route.params.id.payBankNum,
          money : this.$route.params.id.money,
          balance : this.$route.params.id.balance,
          receiveAccount : this.$route.params.id.receiveAccount,
          receiveBank : this.$route.params.id.receiveBank,
          receiveBankNum : this.$route.params.id.receiveBankNum,
          transactionType : this.$route.params.id.transactionType,
          transactionDate : this.$route.params.id.transactionDate,
          payType : this.$route.params.id.payType,
          outIn : this.$route.params.id.outIn,
          moneyType : this.$route.params.id.moneyType,
          posNum : this.$route.params.id.posNum,
          business : this.$route.params.id.business,
          equipment : this.$route.params.id.equipment,
          equipmentNum : this.$route.params.id.equipmentNum,
          ip : this.$route.params.id.ip,
          mac : this.$route.params.id.mac,
          longitude : this.$route.params.id.longitude,
          latitude : this.$route.params.id.latitude,
          bankTransactionNum : this.$route.params.id.bankTransactionNum,
          note : this.$route.params.id.note,
        },
        formLabelWidth: '170px'
      }
    },
    methods:{
        goBack:function(){
            var id = this.$route.params.id.projectId;
            this.$route.params.id.id = id;
            this.$router.push({name:this.$route.params.type,params:{id:this.$route.params.id}});
        },
        onSubmit() {
            this.$axios.post('http://192.168.100.116:8080/project/updateThreeFlow', {
                id : this.form.id,
                projectId : this.form.projectId,
                transactionNum : this.form.transactionNum,
                payAccount : this.form.payAccount,
                payBank : this.form.payBank,
                payBankNum : this.form.payBankNum,
                money : this.form.money,
                balance : this.form.balance,
                receiveAccount : this.form.receiveAccount,
                receiveBank : this.form.receiveBank,
                receiveBankNum : this.form.receiveBankNum,
                transactionType : this.form.transactionType,
                transactionDate : this.form.transactionDate,
                payType : this.form.payType,
                outIn : this.form.outIn,
                moneyType : this.form.moneyType,
                posNum : this.form.posNum,
                equipment : this.form.equipment,
                longitude : this.form.longitude,
                latitude : this.form.latitude,
                equipmentNum : this.form.equipmentNum,
                bankTransactionNum : this.form.bankTransactionNum,
                note : this.form.note,
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
