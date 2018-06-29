<template>
<div>
    <el-button type="info" plain class="el-icon-arrow-left"  @click="goBack()">返回</el-button>
    <table style="width:100%;">
        <tr>
            <td style="text-align:right;width:10%;"><h3>项目名称：</h3></td>
            <td style="width:70%;padding-left: 5px; padding-right: 5px;">{{$route.params.id.name}}</td>
        </tr>
        <tr>
            <td style="text-align:right;width:10%;"><h3>项目描述：</h3></td>
            <td style="width:70%;padding-left: 5px; padding-right: 100px;">{{$route.params.id.instructions}}</td>
        </tr>
        <tr>
            <td style="text-align:right;width:10%;"><h3>数据模板下载：</h3></td>
            <td style="width:70%;padding-left: 5px; padding-right: 100px;">
                <el-button type="info" @click="downloadBank()">银行流水模板</el-button>
                <el-button type="info" @click="downloadThree()">支付宝/财付通流水模板</el-button>
            </td>
        </tr>
        <tr>
            <td style="text-align:right;width:10%;"><h3>银行流水数据上传：</h3></td>
            <td style="width:50%;padding-left: 5px; padding-right: 5px;padding-top:7px;">

                    
                    <el-upload width="50%"
                        class="upload-demo"
                        :action="'http://localhost:8080/project/signlefile/'+$route.params.id.id"
                        :on-remove="handleRemove"
                        :before-upload="beforeUpload"
                        :on-success="onsuccess"
                        :on-error="onerror"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button  type="primary" >点击上传银行项目流水数据</el-button>
                    <div slot="tip" class="el-upload__tip" style="color:#F00">请将现有数据复制到模板文件中进行上传，否则可能会导致上传失败。</div>
                    </el-upload>
            </td>
        </tr>
         <tr>
            <td style="text-align:right;width:10%;"><h3>第三方流水数据上传（支付宝/财付通）：</h3></td>
            <td style="width:50%;padding-left: 5px; padding-right: 5px;padding-top:7px;">

                    <el-upload width="50%"
                        class="upload-demo"
                        :action="'http://localhost:8080/project/importThreeFlow/'+$route.params.id.id"
                        :on-remove="handleRemove"
                        :before-upload="beforeUpload"
                        :on-success="onsuccess"
                        :on-error="onerror"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button  type="primary" >点击上传支付宝或财付通项目流水数据</el-button>
                    <div slot="tip" class="el-upload__tip" style="color:#F00">请将现有数据复制到模板文件中进行上传，否则可能会导致上传失败。</div>
                    </el-upload>
            </td>
        </tr>
        <tr>
            <td style="text-align:right;width:10%;"><h3>银行流水数据统计:</h3></td>
            <td  style="width:70%;padding-left: 5px; ">
                <el-button type="success" round @click="successData()">累计成功上传数据 {{successCount}} 条</el-button>
                <el-button type="danger" round @click="errorData()">其中错误数据 {{errorCount}} 条</el-button>
            </td>
        </tr>
        <tr>
            <td style="text-align:right;width:10%;"><h3>第三方流水数据统计（支付宝/财付通）:</h3></td>
            <td  style="width:70%;padding-left: 5px; ">
                <el-button type="success" round @click="threeSuccessData()">累计成功上传数据 {{threeSuccessCount}} 条</el-button>
                <el-button type="danger" round @click="threeErrorData()">其中错误数据 {{threeErrorCount}} 条</el-button>
            </td>
        </tr>
        <tr>
            <td style="text-align:right;width:10%;"><h3>数据分析:</h3></td>
            <td  style="width:70%;padding-left: 5px; ">
                <el-button type="warning" round @click="showBankData()">银行数据分析</el-button>
                <el-button type="warning" round @click="threeErrorData()">第三方数据分析</el-button>
            </td>
        </tr>
    </table>


</div>
</template>

<script>
import { Message } from 'element-ui';
  export default {
    data() {
      return {
        fileList: [],
        options: [{
          value: '1',
          label: '交通银行'
        }, {
          value: '2',
          label: '农业银行'
        }, {
          value: '3',
          label: '农村信用社'
        }, {
          value: '4',
          label: '工商银行'
        }, {
          value: '5',
          label: '平安银行'
        }],
        value: '',
        successCount:'',
        errorCount:'',
        threeSuccessCount:0,
        threeErrorCount:0,
        fileData:[]
      };
    },created:function(){
       var datas=[];
       let _this = this;
       this.$axios.get('http://192.168.100.116:8080/project/getDataCount/'+this.$route.params.id.id)
          .then(function(response){
              console.log(response);
              _this.successCount=response.data.successCount;
              _this.errorCount=response.data.errorCount;
              _this.threeSuccessCount=response.data.threeSuccessCount;
              _this.threeErrorCount=response.data.threeErrorCount;
          }).catch(function(err){
              Message.error(err);
          });
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        Message.warning('当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件');
      },
      beforeRemove(file, fileList) {
        return this.$confirm('确定移除 ${ file.name }？');
      },
      beforeUpload(file){
          console.log(this.value);
          var name = file.name;
          if('.xls'!=name.substring(name.length-4,name.legth)){
              this.$alert('文件格式不正确，请将数据导入模板文件后上传模板文件！', '提示信息', {
                    confirmButtonText: '确定',
                    callback: action => {
                        Message({
                        type: 'error',
                        message: '文件上传失败'
                        });
                    }
                });
            return false;
          }
      },
      onsuccess(response){
          console.log(response);
          if(response.code!=200){
              this.$alert(response.msg, '提示信息', {
                    confirmButtonText: '确定',
                    callback: action => {
                        Message({
                        type: 'error',
                        message: '文件上传失败'
                        });
                    }
                });
            this.onerror=true;
          }else{

              Message('上传成功！');
              var datas=[];
                let _this = this;
                this.$axios.get('http://192.168.100.116:8080/project/getDataCount/'+this.$route.params.id.id)
                    .then(function(response){
                        _this.successCount=response.data.successCount;
                        _this.errorCount=response.data.errorCount;
                        _this.threeSuccessCount=response.data.threeSuccessCount;
                        _this.threeErrorCount=response.data.threeErrorCount;
                    }).catch(function(err){
                        Message.error(err);
                    });
          }
      },
      onerror(){
          Message.error("上传失败");
      },
      goBack(){
          this.$router.push('/projectList');
      },
      successData(){
          this.$router.push({name:'successBankFlow',params:{id:this.$route.params.id}});
      },
      errorData(){
          this.$router.push({name:'errorBankFlow',params:{id:this.$route.params.id}});
      },
      threeSuccessData(){
          this.$router.push({name:'successThreeFlow',params:{id:this.$route.params.id}});
      },
      threeErrorData(){
          this.$router.push({name:'errorThreeFlow',params:{id:this.$route.params.id}});
      },
      downloadBank(){
          this.$axios.get('http://192.168.100.116:8080/project/downLoadBank',{
              responseType: 'blob',
          })
                .then(function(response){
                    Message.success("下载成功");
                    const content = response  
                    const blob = new Blob([content.data])  
                    const fileName = '银行流水模板.xls'  
                    //return;  
                    if ('download' in document.createElement('a')) { // 非IE下载  
                        const elink = document.createElement('a')  
                        elink.download = fileName  
                        elink.style.display = 'none'  
                        elink.href = URL.createObjectURL(blob)  
                        document.body.appendChild(elink)  
                        elink.click()  
                        URL.revokeObjectURL(elink.href) // 释放URL 对象  
                        document.body.removeChild(elink)  
                    } else { // IE10+下载  
                        navigator.msSaveBlob(blob, fileName)  
                    } 
                }).catch(function(err){
                    Message.error(error);
                });
      },
      downloadThree(){
          this.$axios.get('http://192.168.100.116:8080/project/downLoadThree',{
              responseType: 'blob',
          })
                .then(function(response){
                    Message.success("下载成功");
                    const content = response  
                    const blob = new Blob([content.data])  
                    const fileName = '支付宝/财付通流水模板.xls'  
                    //return;  
                    if ('download' in document.createElement('a')) { // 非IE下载  
                        const elink = document.createElement('a')  
                        elink.download = fileName  
                        elink.style.display = 'none'  
                        elink.href = URL.createObjectURL(blob)  
                        document.body.appendChild(elink)  
                        elink.click()  
                        URL.revokeObjectURL(elink.href) // 释放URL 对象  
                        document.body.removeChild(elink)  
                    } else { // IE10+下载  
                        navigator.msSaveBlob(blob, fileName)  
                    } 
                }).catch(function(err){
                    Message.error(error);
                });
      },
      showBankData(){
          this.$router.push({name:'bankInitialNode',params:{id:this.$route.params.id}});
      }
    }
  }
</script>


