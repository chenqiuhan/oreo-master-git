import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AddProject from "./views/AddProject.vue";
import ProjectList from "./views/ProjectList.vue";
import UploadProject from "./views/UploadProject.vue";
import ProjectInfo from "./views/ProjectInfo.vue";
import ErrorBankFlow from "./views/ErrorBankFlow.vue";
import SuccessBankFlow from "./views/SuccessBankFlow.vue";
import ErrorThreeFlow from "./views/ErrorThreeFlow.vue";
import SuccessThreeFlow from "./views/SuccessThreeFlow.vue";
import UpdateBankFlow from "./views/UpdateBankFlow.vue";
import UpdateThreeFlow from "./views/UpdateThreeFlow.vue";
import ShowData from "./views/ShowData.vue";
import BankInitialNode from "./views/BankInitialNode.vue";
import BankShowTable from "./views/BankShowTable.vue";
import BankDataList from "./views/BankDataList.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: ProjectList
    },
    {
      path: "/addProject",
      name: "addProject",
      component: AddProject
    },
    {
      path: "/projectList",
      name: "projectList",
      component: ProjectList
    },
    {
      path: "/uploadProject",
      name: "uploadProject",
      component: UploadProject
    },
    {
      path: "/projectInfo",
      name: "projectInfo",
      component: ProjectInfo
    },
    {
      path: "/errorBankFlow",
      name: "errorBankFlow",
      component: ErrorBankFlow
    },
    {
      path: "/successBankFlow",
      name: "successBankFlow",
      component: SuccessBankFlow
    },
    {
      path: "/errorThreeFlow",
      name: "errorThreeFlow",
      component: ErrorThreeFlow
    },
    {
      path: "/successThreeFlow",
      name: "successThreeFlow",
      component: SuccessThreeFlow
    },
    {
      path: "/updateBankFlow",
      name: "updateBankFlow",
      component: UpdateBankFlow
    },
    {
      path: "/updateThreeFlow",
      name: "updateThreeFlow",
      component: UpdateThreeFlow
    },
    {
      path: "/showData",
      name: "showData",
      component: ShowData
    },
    {
      path: "/bankInitialNode",
      name: "bankInitialNode",
      component: BankInitialNode
    },
    {
      path: "/bankShowTable",
      name: "bankShowTable",
      component: BankShowTable
    }
    ,
    {
      path: "/bankDataList",
      name: "bankDataList",
      component: BankDataList
    }
  ]
});
