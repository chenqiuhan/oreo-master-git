<template>
    <div style="background-color: #EBEBEB;min-height:800px">
        <div style="width:100%;background-color: #636363; overflow: hidden">
            <span class="demonstration" style="float:left;padding-top:10px;color:white;margin-left:1%;width:15%;height:40px;">
                项目管理
            </span>
            
            
        </div>

        <div style="margin-top:5px">
            <el-row :gutter="10">
                <el-col :xs="4" :sm="4" :md="4" :lg="4">
                    <div>
                        <el-menu default-active="2" class="el-menu-vertical-demo" style="min-height:800px" @select="handleSelect">
                            <el-menu-item index="1"><i class="el-icon-circle-plus"></i>新增项目</el-menu-item>
                            <el-menu-item index="2"><i class="el-icon-menu"></i>项目列表</el-menu-item>
                        </el-menu>
                    </div>
                </el-col>
                <el-col :xs="20" :sm="20" :md="20" :lg="20">
                    
                    <div style="margin-top:10px">
                        <router-view></router-view>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                searchCriteria: '',
            }
        },

        methods:{
            handleIconClick(ev) {
                console.log(ev);
            },

            handleSelect(key, keyPath){
                switch(key){
                    case '1':
                        this.$router.push('/addProject');
                        break;
                    case '2':
                        this.$router.push('/projectList');
                        break;
                    case '3':
                        this.$router.push('/showData')
                }
            },

        },
    }
</script>