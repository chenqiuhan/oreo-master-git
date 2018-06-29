<template>
<el-upload
  class="upload-demo"
  action="http://localhost:8080/project/signlefile"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-upload="beforeUpload"
  :on-success="onsuccess"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip"></div>
</el-upload>
</template>
<script>
import { Message } from 'element-ui';
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning('当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件');
      },
      beforeRemove(file, fileList) {
        return this.$confirm('确定移除 ${ file.name }？');
      },
      beforeUpload(file){
          console.log(file);
      },
      onsuccess(){
          Message('上传成功！');
      }
    }
  }
</script>