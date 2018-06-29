<template>

  <div id="app">
    
<el-row class="tac">
        <!--
        <el-col :span="6"><div class="grid-content bg-purple" align="center"><router-link to="/">HOME</router-link></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><router-link to="/addProject">新增项目</router-link></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><router-link to="/projectList">查看项目</router-link></div></el-col>
      </el-row>-->
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>项目管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1"><router-link to="/addProject">新增项目</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link to="/projectList">查看项目</router-link></el-menu-item>
              </el-menu-item-group>
              
            </el-submenu>
            
          </el-menu>
        </el-col>
      </el-row> 
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

