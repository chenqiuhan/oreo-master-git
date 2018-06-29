<template>
<el-form ref="form" :model="form" width="50%" label-width="80px">
  <el-form-item label="项目名称">
    <el-input v-model="form.name" maxlength="30"></el-input>
  </el-form-item>
  <el-form-item label="项目说明">
    <el-input type="textarea" v-model="form.instructions" style="min-height: 100px;" maxlength="1000"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { Message } from 'element-ui';
  export default {
    data() {
      return {
        form: {
          name: '',
          instructions: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$axios.post('http://192.168.100.116:8080/project', {
          name: this.form.name,
          instructions: this.form.instructions
        })
        .then(function (response) {
          console.log(response);
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