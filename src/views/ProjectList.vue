<template>
<div >
  <div>
  <el-form ref="form" :model="sele">
    <el-form-item>
      <el-input v-model="sele.name" style="width:200px;"  placeholder="请输入项目名称" maxlength="30"></el-input>
      <span style="width:50px;" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <el-button type="primary" icon="el-icon-search" @click="selectProject">查询</el-button>
    </el-form-item>
  </el-form>
  </div>
  <el-table
    :data="tableData"
    height="720"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="创建日期"
      width="380"
      align="left"
      >
      
    </el-table-column>
    <el-table-column
      prop="name"
      label="项目名称"
      width="380"
      align="left">
      
    </el-table-column>
    <el-table-column
      label="项目说明"
      width="380"
      align="left"
      prop="instructions">
      
    </el-table-column>
    <el-table-column label="操作" align="left">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <router-link :to="{name:'projectInfo',params:{id:scope.row}}">
            <el-button size="mini" >详情</el-button>

          </router-link>
          
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       
       <el-dialog title="修改项目信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="项目说明" :label-width="formLabelWidth">
               <el-input type="textarea" v-model="form.instructions" maxlength="1000"></el-input>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit()">确 定</el-button>
        </div>
      </el-dialog>
       
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script src="element-ui/lib/index.js"></script>
<script>
  import { Message } from 'element-ui';
  export default {
    data() {
      return {
        dialogFormVisible: false,
        tableData: [],
         form: {
          id:'',
          name: '',
          instructions:''
        },
        sele: {
          name: ''
        },
        formLabelWidth: '120px'
      }
    },created:function(){
       var datas=[];
       let _this = this;
       this.$axios.get('http://192.168.100.116:8080/project')
          .then(function(response){
              for(let k=0;k<response.data.length;k++){
                var obj={};
                obj.id = response.data[k].id;
                obj.date = response.data[k].createDate;
                obj.name = response.data[k].name;
                obj.instructions = response.data[k].instructions;
                datas[k] = obj;
              }
              _this.tableData=datas;
          }).catch(function(err){
              Message.error(error);
          });
    },
    methods: {
      
      handleEdit(index, row) {
        this.dialogFormVisible=true;
        this.form.id=row.id;
        this.form.name=row.name;
        this.form.instructions=row.instructions;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条项目信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$axios.delete('http://192.168.100.116:8080/project/'+row.id)
          .then((response)=>{
            Message({
              type: 'success',
              message: '删除成功!'
            });
            var datas=[];
            let _this = this;
            this.$axios.get('http://192.168.100.116:8080/project')
                .then(function(response){
                    for(let k=0;k<response.data.length;k++){
                      var obj={};
                      obj.id = response.data[k].id;
                      obj.date = response.data[k].createDate;
                      obj.name = response.data[k].name;
                      obj.instructions = response.data[k].instructions;
                      datas[k] = obj;
                    }
                    _this.tableData=datas;
                }).catch(function(err){
                    Message.error(error);
                });
          }).catch(function(err){
              Message.error(error);
          });
          
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
       
      },
      onSubmit() {
        this.$axios.put('http://192.168.100.116:8080/project', {
          id: this.form.id,
          name: this.form.name,
          instructions: this.form.instructions
        })
        .then( (response) =>{
          if(response.status==200){
            Message({
              message: '修改成功！',
              type: 'success'
            });
          }else{
            Message.error(response.msg);
          }
            var datas=[];
            let _this = this;
            _this.dialogFormVisible = false;
            this.$axios.get('http://192.168.100.116:8080/project')
                .then(function(response){
                    for(let k=0;k<response.data.length;k++){
                      var obj={};
                      obj.id = response.data[k].id;
                      obj.date = response.data[k].createDate;
                      obj.name = response.data[k].name;
                      obj.instructions = response.data[k].instructions;
                      datas[k] = obj;
                    }
                    _this.tableData=datas;
                }).catch(function(err){
                    Message.error(error);
                });
        })
        .catch(function (error) {
          Message.error(error);
        });
      
      },
      selectProject(){
        var datas=[];
       let _this = this;
       this.$axios.post('http://192.168.100.116:8080/project/selectProject',{
         name:this.sele.name
       })
          .then(function(response){
              for(let k=0;k<response.data.length;k++){
                var obj={};
                obj.id = response.data[k].id;
                obj.date = response.data[k].createDate;
                obj.name = response.data[k].name;
                obj.instructions = response.data[k].instructions;
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