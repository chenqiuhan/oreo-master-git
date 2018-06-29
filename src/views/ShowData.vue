<template>
    <div>
        <el-button type="info" plain class="el-icon-arrow-left"  @click="goBack()">返回</el-button>
        <div>
            <div style="height:60px;">
                </br>
                <span style="width:50px;font-size:20px;" >项目名称：{{$route.params.id.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red;font-size:15px;">(项目数据起始时间：{{dataStart}})</span></span>

            </div>
            <el-form ref="form" :model="sele">
                <el-form-item>
                <el-input v-model="sele.account" style="width:200px;"  placeholder="请输入账号" maxlength="30"></el-input>
                <span style="width:50px;" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-date-picker
                    v-model="sele.transactionDate"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择开始时间">
                    </el-date-picker>
                    <span style="width:50px;" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input v-model="sele.intervals" style="width:200px;"  placeholder="请输入间隔时间(小时)" maxlength="3"></el-input>
                    <span style="width:50px;" >小时&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input v-model="sele.level" style="width:200px;"  placeholder="请输入展示级数" maxlength="3"></el-input>
                    <span style="width:50px;" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button type="primary" icon="el-icon-search" @click="showData()">开始数据分析</el-button>
                </el-form-item>
                <el-button type="success"  >说明：1.只有一次转账行为的帐号背景色为<span style="color:#fff">灰色</span>，文字颜色为白色（例：初始帐号节点）；
                    2.相同背景颜色节点表示相同的帐号；
                    3.相同字体颜色节点表示相同的账户姓名。</el-button>
                </br>（线条金额标注：
                <span style="color:#573c34">0 以下；</span>
                <span style="color:#0a9cb6">0-500；</span>
                <span style="color:#6eca6b">500-1,000；</span>
                <span style="color:#a1ad32">1,000-5,000；</span>
                <span style="color:#fc9753">5,000-10,000；</span>
                <span style="color:#eda9f0">10,000-50,000；</span>
                <span style="color:#8d2d1c">50,000-100,000；</span>
                <span style="color:#7e1478">100,000-500,000；</span>
                <span style="color:#e40808">500,000以上</span>
                ）
                </br>
            </el-form>
        </div>
        <div>
            <el-dialog title="银行流水详情" :visible.sync="dialogFormVisible" >
                <el-table
                    :row-class-name="tableRowClassName"
                    :data="tableData"
                    height="500"
                    style="width: 950px;">

                    <el-table-column
                        prop="index"
                        label="序号"
                        width="50"
                        align="center"
                    ></el-table-column>

                    <el-table-column
                        prop="account"
                        label="查询账号"
                        width="180"
                        align="center"
                    ></el-table-column>

                    <el-table-column
                        label="对方账号卡号"
                        width="180"
                        align="center"
                        prop="toAccount"
                    ></el-table-column>

                    <el-table-column
                        prop="toName"
                        label="对方账号姓名"
                        width="120"
                        align="center"
                    ></el-table-column>


                    <el-table-column
                        prop="balance"
                        label="余额"
                        width="100"
                        align="center"
                    ></el-table-column>

                    <el-table-column
                        prop="borrowFlag"
                        label="转账类型"
                        width="100"
                        align="center"
                    ></el-table-column>


                    <el-table-column
                        prop="transactionDate"
                        label="交易时间"
                        width="180"
                        align="center"
                    ></el-table-column>
                    
                </el-table>
                <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div id='cy'>
        </div>
    </div>
</template>

<style>
    #cy {
        width: 1600px;
        height: 650px;
        display: block;
    }

  .el-table .warning-row {
    background: rgb(219, 219, 218);
  }
</style>



<script>
import cytoscape from "cytoscape";
import { Message } from 'element-ui';
import { WSASYSNOTREADY } from 'constants';
export default {
    data(){
        return {
            dialogFormVisible: false,
            tableData: [],
             sele: {
                account: '',
                transactionDate:"",
                level:"",
                intervals:""
            },
            formLabelWidth: '120px',
            dataStart:this.$route.params.id.transactionDate,
        }
    },
    created:function(){
        this.$nextTick(()=>{
            
            var cytoscape = require('cytoscape');
            this.cy = cytoscape({
    
            container: document.getElementById('cy'), // container to render in要渲染的容器
            elements:  [],
            style: [{
                "selector": "core",
                "style": {
                    "selection-box-color": "#AAD8FF",
                    "selection-box-border-color": "#8BB0D0",
                    "selection-box-opacity": "0.5"
                }
                }, {
                "selector": "node",
                "style": {
                    "shape":"rectangle",
                    "width": "90",
                    "height": "90",
                    "content": "data(name)",
                    "font-size": "12px",
                    "text-valign": "center",
                    "text-halign": "center",
                    "background-color": "#555",
                    "background-opacity":"1",
                    "border-opacity":"1",
                    "text-outline-color": "#555",
                    "text-outline-width": "2px",
                    "text-wrap":"wrap",
                    "color": "#fff",
                    "overlay-padding": "6px",
                    "z-index": "10",
                    
                }
                },
                {
                    "selector": "node[group=\"dateText\"]",
                    "style": {
                        "background-color": "#555",
                        "background-opacity":"0",
                        "font-size":"16px",
                        "text-outline-color": "white",
                        "text-outline-width": "0px",
                        "color":"red"
                    }
                }, {
                "selector": "node[?attr]",
                "style": {
                    "shape": "rectangle",
                    "background-color": "#aaa",
                    "text-outline-color": "#aaa",
                    "width": "26px",
                    "height": "26px",
                    "font-size": "6px",
                    "z-index": "1"
                }
                }, {
                "selector": "node[?query]",
                "style": {
                    "background-clip": "none",
                    "background-fit": "contain"
                }
                }, {
                "selector": "node:selected",
                "style": {
                    "border-width": "6px",
                    "border-color": "#AAD8FF",
                    "border-opacity": "0.5",
                    "background-color": "#77828C",
                    "text-outline-color": "#77828C"
                }
                }, {
                "selector": "edge",
                "style": {
                    "curve-style": "bezier",   //边缘线样式
                    "haystack-radius": "0.5",
                    "opacity": "0.4",
                    "line-color": "#bbb",
                    "width": "mapData(weight, 0, 1, 1, 8)",
                    "overlay-padding": "3px",
                    "mid-target-arrow-shape": "triangle",   //箭头形状
                    "mid-target-arrow-color": "#000000"  //箭头颜色
                }
                }, {
                "selector": "node.unhighlighted",
                "style": {
                    "opacity": "0.2"
                }
                }, {
                "selector": "edge.unhighlighted",
                "style": {
                    "opacity": "0.05"
                }
                }, {
                "selector": ".highlighted",
                "style": {
                    "z-index": "999999"
                }
                }, {
                "selector": "node.highlighted",
                "style": {
                    "border-width": "6px",
                    "border-color": "#AAD8FF",
                    "border-opacity": "0.5",
                    "background-color": "#394855",
                    "text-outline-color": "#394855"
                }
                }, {
                "selector": "edge.filtered",
                "style": {
                    "opacity": "0"
                }
                }, {
                "selector": "edge[group=\"coexp\"]",
                "style": {
                    "line-color": "#d0b7d5"
                }
                }, {
                "selector": "edge[group=\"pi\"]",
                "style": {
                    "line-color": "#573c34"
                }
                }, {
                "selector": "edge[group=\"fiveH\"]",
                "style": {
                    "line-color": "#0a9cb6"
                }
                }, {
                "selector": "edge[group=\"oneT\"]",
                "style": {
                    "line-color": "#6eca6b"
                }
                }, {
                "selector": "edge[group=\"fiveT\"]",
                "style": {
                    "line-color": "#a1ad32"
                }
                }, {
                "selector": "edge[group=\"oneW\"]",
                "style": {
                    "line-color": "#fc9753"
                }
                }, {
                "selector": "edge[group=\"fiveW\"]",
                "style": {
                    "line-color": "#eda9f0"
                }
                }, {
                "selector": "edge[group=\"tenW\"]",
                "style": {
                    "line-color": "#8d2d1c"
                }
                }, {
                "selector": "edge[group=\"fiftyW\"]",
                "style": {
                    "line-color": "#7e1478"
                }
                }, {
                "selector": "edge[group=\"top\"]",
                "style": {
                    "line-color": "#e40808"
                }
                }],
    
            layout: {
                name: 'cose',
                idealEdgeLength: 100,
                nodeOverlap: 20,
                refresh: 20,
                fit: true,
                padding: 30,
                randomize: false,
                componentSpacing: 100,
                nodeRepulsion: 400000,
                edgeElasticity: 100,
                nestingFactor: 5,
                gravity: 80,
                numIter: 1000,
                initialTemp: 200,
                coolingFactor: 0.95,
                minTemp: 1.0
            },
    
            });
            this.$axios.post('http://192.168.100.116:8080/project/selectBankDataAfterDate',
            {projectId:this.$route.params.id.projectId,
            account:this.$route.params.id.account,})
            .then((response)=>{
                console.log(response);
                var date = response.data.msg;
                response.data = response.data.data;
                this.dataStart = date;
                var rownum = 0;

                var text = []; //判断不同时间段内相同节点用相同背景颜色
                var textnum = 0;

                var nametext = [];//判断账号姓名相同节点用相同文字颜色
                var nametextnum = 0;

                var firstrowFlag = true;  //判断是否是第一组有数据的记录(第一组数据整体右移，没行4个节点)
                var firstrowEnd = false;  //与firstrowFlag进行组合判断
                //先画初始节点
                var initialNode = this.sele.account.length==0?this.$route.params.id.account:this.sele.account;
                this.cy.add({
                    group:"nodes",
                    removed:false,
                    selected:false,
                    selectable:true,
                    locked:false,
                    grabbed:false,
                    grabbable:true,
                    data:{
                            id:initialNode,
                            name:initialNode,
                            query:false,
                            gene:true,
                            group:initialNode
                        }, 
                    // position: { x: count%7*170+170+100, y: (parseInt(count/7)+1)*(200/(parseInt(count/7)+2))+(200/(parseInt(count/7)+2))+i*200 }
                    position: { x: 270, y: 70 }
                });
                text[textnum] = initialNode;
                textnum++;
                for(let i=0;i<response.data.length;i++){
                    var count = 0;
                    var accounts=[]; //判断相同时间段内是否有重复节点
                    accounts[count] = initialNode;  //将初始节点放入节点集合中
                    //计算时间节点
                    var intervals = this.sele.intervals.length==0?24:this.sele.intervals;
                    date =  new Date(date);
                    date.setHours (date.getHours () + i*intervals);
                    var month = date.getMonth()+1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var minu = date.getMinutes();
                    var second = date.getSeconds();

                    month = month<10?"0"+month:month;
                    day = day<10?"0"+day:day;
                    hour = hour<10?"0"+hour:hour;
                    minu = minu<10?"0"+minu:minu;
                    second = second<10?"0"+second:second;
                    //画出时间段节点
                    date = date.getFullYear()+"-"+month+"-"+day+" "+hour+":"+minu+":"+second;
                    this.cy.add({
                        group:"nodes",
                        removed:false,
                        selected:false,
                        selectable:true,
                        locked:false,
                        grabbed:false,
                        grabbable:true,
                        data:{
                                id:i,
                                name:date,
                                query:false,
                                gene:true,
                                group:"dateText"
                            }, 
                        //position: { x: 50, y: (parseInt(count/7)+1)*(200/(parseInt(count/7)+2))+(200/(parseInt(count/7)+2))+i*200 }
                        position: { x: 75, y: (parseInt(count/7)+1)*100+100+rownum*150 }
                    });
                    
                    for(let j=0;j<response.data[i].length;j++){
                        //判断查询账号节点是否已存在，不存在则画出该节点
                        var accountText;
                        var ypoint;
                        var xpoint;
                        if(response.data[i][j].account==this.$route.params.id.account){
                            accountText = response.data[i][j].account;
                            ypoint = 70;
                        }else{
                            accountText = response.data[i][j].account+i;
                            ypoint = (parseInt(count/7)+1)*100+100+rownum*150;
                        }
                        if(accounts.indexOf(accountText)==-1){
                            if(firstrowFlag){  //如果是第一组有数据的记录，每行显示4个节点
                                xpoint = count%4*170+950;
                                ypoint = (parseInt(count/4)+1)*100+100+rownum*150;
                                firstrowEnd = true;
                            }else{
                                xpoint = count%7*170+170+170+100;
                            }
                            this.cy.add({
                                group:"nodes",
                                removed:false,
                                selected:false,
                                selectable:true,
                                locked:false,
                                grabbed:false,
                                grabbable:true,
                                data:{
                                        id:accountText,
                                        name:response.data[i][j].account+"",
                                        query:false,
                                        gene:true,
                                        group:response.data[i][j].account
                                    }, 
                                // position: { x: count%7*170+170+100, y: (parseInt(count/7)+1)*(200/(parseInt(count/7)+2))+(200/(parseInt(count/7)+2))+i*200 }
                                position: { x: xpoint, y: ypoint }
                            });
                            accounts[count]=accountText;
                            count++;
                            if(text.indexOf(response.data[i][j].account)!=-1 && response.data[i][j].account!=this.$route.params.id.account){
                                //生成随机颜色，相同帐号节点用相同背景色
                                var col =  "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
                                this.cy.nodes("node[group=\""+response.data[i][j].account+"\"]").style("background-color",col);
                            }
                            text[textnum]=response.data[i][j].account;
                            textnum++;
                        }
                        //判断对方账号节点是否已存在，不存在则画出该节点
                        var borrowFlag = "转入次数：";
                         if("贷"==response.data[i][j].borrowFlag){
                             borrowFlag = "转出次数：";
                         }
                        var toAccountText = response.data[i][j].toAccount+i;
                        if(accounts.indexOf(toAccountText)==-1){
                            if(firstrowFlag){  //如果是第一组有数据的记录，每行显示4个节点
                                xpoint = count%4*170+950;
                                ypoint = (parseInt(count/4)+1)*100+100+rownum*150;
                                firstrowEnd = true;
                            }else{
                                xpoint = count%7*170+170+170+100;
                                ypoint = (parseInt(count/7)+1)*100+100+rownum*150;
                            }
                            var toName = response.data[i][j].toName.length>6?response.data[i][j].toName.substring(0,3)+"...":response.data[i][j].toName;
                            this.cy.add({
                                group:"nodes",
                                removed:false,
                                selected:false,
                                selectable:true,
                                locked:false,
                                grabbed:false,
                                grabbable:true,
                                data:{
                                        id:toAccountText,
                                        name:"账号："+toAccountText.substring(toAccountText.length-5,toAccountText.length-1)+"\n姓名："+toName+"\n余额："+response.data[i][j].balance+"\n时间："+response.data[i][j].transactionDate.substr(response.data[i][j].transactionDate.length-8)+"\n"+borrowFlag+response.data[i][j].count,
                                        query:false,
                                        gene:true,
                                        group:response.data[i][j].toAccount,
                                        class:response.data[i][j].toName,
                                    }, 
                                // position: { x: count%7*170+170+100, y: (parseInt(count/7)+1)*(200/(parseInt(count/7)+2))+(200/(parseInt(count/7)+2))+i*200 }
                                position: { x: xpoint, y: ypoint}
                            });
                            accounts[count+1]=toAccountText;
                            count++;
                            if(text.indexOf(response.data[i][j].toAccount)!=-1){
                                //生成随机颜色，相同帐号节点用相同背景色
                                var col =  "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
                                this.cy.nodes("node[group=\""+response.data[i][j].toAccount+"\"]").style("background-color",col);
                            }
                            text[textnum]=response.data[i][j].toAccount;
                            textnum++;
                            if(nametext.indexOf(response.data[i][j].toName)!=-1){
                                //生成随机颜色，应用于节点标签字体颜色
                                var col =  "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
                                this.cy.nodes("node[class=\""+response.data[i][j].toName+"\"]").style("color",col);
                                this.cy.nodes("node[class=\""+response.data[i][j].toName+"\"]").style("text-outline-width","0px");
                                
                            }else{
                                nametext[nametextnum] = response.data[i][j].toName;
                                nametextnum++;
                            }

                            this.cy.nodes("#"+toAccountText).on("click",(e)=>{
                                var datas=[];
                                this.$axios.post('http://192.168.100.116:8080/project/selectBankFlow',
                                    {
                                        projectId:this.$route.params.id.projectId,
                                        account:this.$route.params.id.account,
                                        toAccount:response.data[i][j].toAccount,
                                        transactionDateStrStart:this.dataStart,
                                        level:i,
                                        intervals:intervals,

                                    }).then((response)=>{
                                        for(let k=0;k<response.data.length;k++){
                                            var obj={};
                                            obj.index = k+1;
                                            obj.account = response.data[k].account;
                                            obj.toAccount = response.data[k].toAccount;
                                            obj.toName = response.data[k].toName;
                                            obj.balance = response.data[k].balance;
                                            obj.transactionDate = response.data[k].transactionDate;
                                            obj.borrowFlag = response.data[k].borrowFlag=='借'?"转入":"转出";
                                            datas[k] = obj;
                                        }
                                        this.tableData = datas;
                                        this.dialogFormVisible=true;

                                    }).catch(function(err){
                                        Message.error(err);
                                    });
                            });
                        }else{
                            //存在，修改节点资金流向信息
                            var oldname = this.cy.getElementById(toAccountText).data('name');
                            console.log(oldname);
                            var newDate = response.data[i][j].transactionDate+"";
                            newDate = response.data[i][j].transactionDate.substring(response.data[i][j].transactionDate.length-8);
                            oldname = oldname.lastIndexOf("时")==-1?"时间："+newDate:oldname.substr(oldname.lastIndexOf("时"));
                            console.log(oldname);
                            var toName = response.data[i][j].toName.length>6?response.data[i][j].toName.substring(0,3)+"...":response.data[i][j].toName;
                            var newname = "账号："+toAccountText.substring(toAccountText.length-5,toAccountText.length-1)
                                            +"\n姓名："+toName
                                            +"\n余额："+response.data[i][j].balance
                                            +"\n"+oldname
                                            +"\n"+borrowFlag+response.data[i][j].count;
                            this.cy.getElementById(toAccountText).data('name',newname);

                            this.cy.nodes("#"+toAccountText).on("click",(e)=>{
                                var datas=[];
                                this.$axios.post('http://192.168.100.116:8080/project/selectBankFlow',
                                    {
                                        projectId:this.$route.params.id.projectId,
                                        account:this.$route.params.id.account,
                                        toAccount:response.data[i][j].toAccount,
                                        transactionDateStrStart:this.dataStart,
                                        level:i,
                                        intervals:intervals,
                                    }).then((response)=>{
                                        for(let k=0;k<response.data.length;k++){
                                            var obj={};
                                            obj.index = k+1;
                                            obj.account = response.data[k].account;
                                            obj.toAccount = response.data[k].toAccount;
                                            obj.toName = response.data[k].toName;
                                            obj.balance = response.data[k].balance;
                                            obj.transactionDate = response.data[k].transactionDate;
                                            obj.borrowFlag = response.data[k].borrowFlag=='借'?"转入":"转出";
                                            datas[k] = obj;
                                        }
                                        this.tableData = datas;
                                        this.dialogFormVisible=true;

                                    }).catch(function(err){
                                        Message.error(err);
                                    });
                            });
                        }

                        //画边缘
                        var color = response.data[i][j].totalMoney+"";
                        //通过转账金额匹配边缘颜色
                        if(parseFloat(color)<0){
                            color = "pi";
                        }else if(parseFloat(color)>0 && parseFloat(color)<500){
                            color = "fiveH";
                        }else if(parseFloat(color)>=500 && parseFloat(color)<1000){
                            color = "oneT";
                        }else if(parseFloat(color)>=1000 && parseFloat(color)<5000){
                            color = "fiveT";
                        }else if(parseFloat(color)>=5000 && parseFloat(color)<10000){
                            color = "oneW";
                        }else if(parseFloat(color)>=10000 && parseFloat(color)<50000){
                            color = "fiveW";
                        }else if(parseFloat(color)>=50000 && parseFloat(color)<100000){
                            color = "tenW";
                        }else if(parseFloat(color)>=100000 && parseFloat(color)<500000){
                            color = "fiftyW";
                        }else {
                            color = "top";
                        }
                        if("贷"==response.data[i][j].borrowFlag){
                            var t = accountText;
                            accountText = toAccountText;
                            toAccountText = t;
                        }
                        this.cy.add({
                            data:{
                                source:accountText,
                                target:toAccountText,
                                weight: 0.3,
                                group: color,
                                networkId: 918,
                                networkGroupId: 23,
                                intn: true,
                                rIntnId: i+""+j,
                                id: i+""+j
                            },
                            position: {},
                            group: "edges",
                            removed: false,
                            selected: false,
                            selectable: true,
                            locked: false,
                            grabbed: false,
                            grabbable: true,
                            classes: ""
                        });
                    }
                    if(firstrowFlag&&firstrowEnd){
                        rownum+=parseInt(count/4)+1;
                        firstrowFlag = false;
                    }else{
                        rownum+=parseInt(count/7)+1;
                    }
                }
            }).catch(function(err){
                Message.error(err);
            });
            
        })
    },
    methods:{
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 1) {
            return 'warning-row';
            } 
            return '';
        },
        selectProjectBankFlow(){
            var account = this.sele.account;
            this.cy.getElementById(account).select();
        },
        goBack:function(){
            this.$route.params.id.id = this.$route.params.id.projectId;
            this.$router.push({name:'bankInitialNode',params:{id:this.$route.params.id}});
        },
        showData:function(){
            var r = /^\+?[1-9][0-9]*$/;  //判断是否是正整数
            if(this.sele.account.length>0&&!r.test(this.sele.account)){
                Message.error("帐号格式不正确");
                return false;
            }
            if(this.sele.intervals.length>0&&!r.test(this.sele.intervals)){
                Message.error("间隔时间格式不正确");
                return false;
            }
            if(this.sele.level.length>0&&!r.test(this.sele.level)){
                Message.error("展示等级格式不正确");
                return false;
            }
            //删除原图所有节点和样式，重新画图
            this.cy.nodes().removeStyle();
            this.cy.nodes().remove();
            var transactionDateStrStart = this.sele.transactionDate;
            if(transactionDateStrStart==null || transactionDateStrStart=='undefined' || transactionDateStrStart.length<1){
                transactionDateStrStart = null;
            }
            this.$axios.post('http://192.168.100.116:8080/project/selectBankDataAfterDate',
            {
                projectId:this.$route.params.id.projectId,
                account:this.sele.account.length==0?this.$route.params.id.account:this.sele.account,
                transactionDateStrStart:transactionDateStrStart,
                intervals:this.sele.intervals,
                level:this.sele.level

            }).then((response)=>{
                var date = response.data.msg;
                response.data = response.data.data;
                this.dataStart = date;
                var rownum = 0;

                var text=[];  //判断不同时间段内相同节点用相同背景颜色
                var textnum = 0;

                var nametext = [];//判断账号姓名相同节点用相同文字颜色
                var nametextnum = 0;

                var firstrowFlag = true;  //判断是否是第一组有数据的记录(第一组数据整体右移，没行4个节点)
                var firstrowEnd = false;  //与firstrowFlag进行组合判断
                //先画初始节点
                var initialNode = this.sele.account.length==0?this.$route.params.id.account:this.sele.account;
                this.cy.add({
                    group:"nodes",
                    removed:false,
                    selected:false,
                    selectable:true,
                    locked:false,
                    grabbed:false,
                    grabbable:true,
                    data:{
                            id:initialNode,
                            name:initialNode,
                            query:false,
                            gene:true,
                            group:initialNode
                        }, 
                    // position: { x: count%7*170+170+100, y: (parseInt(count/7)+1)*(200/(parseInt(count/7)+2))+(200/(parseInt(count/7)+2))+i*200 }
                    position: { x: 270, y: 70 }
                });
                text[textnum] = initialNode;
                textnum++;
                for(let i=0;i<response.data.length;i++){
                    var count = 0;
                    var accounts=[];  //判断相同时间段内是否有重复节点
                    accounts[count] = initialNode;  //将初始节点放入节点集合中

                    var edg = [];  //判断相同时间段内是否有重复边缘
                    //计算时间节点
                    var intervals = this.sele.intervals.length==0?24:this.sele.intervals;
                    date =  new Date(date);
                    date.setHours (date.getHours () + i*intervals);
                    var month = date.getMonth()+1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var minu = date.getMinutes();
                    var second = date.getSeconds();

                    month = month<10?"0"+month:month;
                    day = day<10?"0"+day:day;
                    hour = hour<10?"0"+hour:hour;
                    minu = minu<10?"0"+minu:minu;
                    second = second<10?"0"+second:second;
                    //画出时间段节点
                    date = date.getFullYear()+"-"+month+"-"+day+" "+hour+":"+minu+":"+second;
                    this.cy.add({
                        group:"nodes",
                        removed:false,
                        selected:false,
                        selectable:true,
                        locked:false,
                        grabbed:false,
                        grabbable:true,
                        data:{
                                id:i,
                                name:date,
                                query:false,
                                gene:true,
                                group:"dateText"
                            }, 
                        //position: { x: 50, y: (parseInt(count/7)+1)*(200/(parseInt(count/7)+2))+(200/(parseInt(count/7)+2))+i*200 }
                        position: { x: 75, y: (parseInt(count/7)+1)*100+100+rownum*150 }
                    });
                    for(let j=0;j<response.data[i].length;j++){
                        //判断查询账号节点是否已存在，不存在则画出该节点
                        var accountText;
                        var ypoint;
                        var xpoint;
                        if(response.data[i][j].account==this.$route.params.id.account){
                            accountText = response.data[i][j].account;
                            ypoint = 70;
                        }else{
                            accountText = response.data[i][j].account+i;
                            ypoint = (parseInt(count/7)+1)*100+100+rownum*150;
                        }
                        if(accounts.indexOf(accountText)==-1){
                            if(firstrowFlag){  //如果是第一组有数据的记录，每行显示4个节点
                                xpoint = count%4*170+950;
                                ypoint = (parseInt(count/4)+1)*100+100+rownum*150;
                                firstrowEnd = true;
                            }else{
                                xpoint = count%7*170+170+170+100;
                            }
                            this.cy.add({
                                group:"nodes",
                                removed:false,
                                selected:false,
                                selectable:true,
                                locked:false,
                                grabbed:false,
                                grabbable:true,
                                data:{
                                        id:accountText,
                                        name:response.data[i][j].account+"",
                                        query:false,
                                        gene:true,
                                        group:response.data[i][j].account
                                    }, 
                                // position: { x: count%7*170+170+100, y: (parseInt(count/7)+1)*(200/(parseInt(count/7)+2))+(200/(parseInt(count/7)+2))+i*200 }
                                position: { x: xpoint, y: ypoint }
                            });
                            accounts[count+1]=accountText;
                            count++;
                            if(text.indexOf(response.data[i][j].account)!=-1 && response.data[i][j].account!=this.$route.params.id.account){
                                //生成随机颜色，相同帐号节点用相同背景色
                                var col =  "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
                                this.cy.nodes("node[group=\""+response.data[i][j].account+"\"]").style("background-color",col);
                            }
                            text[textnum]=response.data[i][j].account;
                            textnum++;
                        }
                        //判断对方账号节点是否已存在，不存在则画出该节点
                        var borrowFlag = "转入次数：";
                         if("贷"==response.data[i][j].borrowFlag){
                             borrowFlag = "转出次数：";
                         }
                        var toAccountText = response.data[i][j].toAccount+i;
                        if(accounts.indexOf(toAccountText)==-1){
                            if(firstrowFlag){  //如果是第一组有数据的记录，每行显示4个节点
                                xpoint = count%4*170+950;
                                ypoint = (parseInt(count/4)+1)*100+100+rownum*150;
                                firstrowEnd = true;
                            }else{
                                xpoint = count%7*170+170+170+100;
                                ypoint = (parseInt(count/7)+1)*100+100+rownum*150;
                            }
                            var toName = response.data[i][j].toName.length>6?response.data[i][j].toName.substring(0,3)+"...":response.data[i][j].toName;
                            this.cy.add({
                                group:"nodes",
                                removed:false,
                                selected:false,
                                selectable:true,
                                locked:false,
                                grabbed:false,
                                grabbable:true,
                                data:{
                                        id:toAccountText,
                                        name:"账号："+toAccountText.substring(toAccountText.length-5,toAccountText.length-1)+"\n姓名："+toName+"\n余额："+response.data[i][j].balance+"\n时间："+response.data[i][j].transactionDate.substr(response.data[i][j].transactionDate.length-8)+"\n"+borrowFlag+response.data[i][j].count,
                                        query:false,
                                        gene:true,
                                        group:response.data[i][j].toAccount,
                                        class:response.data[i][j].toName,
                                    }, 
                                // position: { x: count%7*170+170+100, y: (parseInt(count/7)+1)*(200/(parseInt(count/7)+2))+(200/(parseInt(count/7)+2))+i*200 }
                                position: { x: xpoint, y: ypoint }
                            });
                            accounts[count+1]=toAccountText;
                            count++;
                            if(text.indexOf(response.data[i][j].toAccount)!=-1){
                                //生成随机颜色，相同帐号节点用相同背景色
                                var col = "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
                                this.cy.nodes("node[group=\""+response.data[i][j].toAccount+"\"]").style("background-color",col);
                            }
                            text[textnum]=response.data[i][j].toAccount;
                            textnum++;
                            if(nametext.indexOf(response.data[i][j].toName)!=-1){
                                //生成随机颜色，应用于节点标签字体颜色
                                var col =  "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
                                this.cy.nodes("node[class=\""+response.data[i][j].toName+"\"]").style("color",col);
                                
                                this.cy.nodes("node[class=\""+response.data[i][j].toName+"\"]").style("text-outline-width","0px");
                            }else{
                                nametext[nametextnum] = response.data[i][j].toName;
                                nametextnum++;
                            }
                            this.cy.nodes("#"+toAccountText).on("click",(e)=>{
                                var datas=[];
                                this.$axios.post('http://192.168.100.116:8080/project/selectBankFlow',
                                    {
                                        projectId:this.$route.params.id.projectId,
                                        account:this.$route.params.id.account,
                                        toAccount:response.data[i][j].toAccount,
                                        intervals:this.sele.intervals,
                                        transactionDateStrStart:this.dataStart,
                                        level:i,
                                        intervals:intervals
                                    }).then((response)=>{
                                        for(let k=0;k<response.data.length;k++){
                                            var obj={};
                                            obj.index = k+1;
                                            obj.account = response.data[k].account;
                                            obj.toAccount = response.data[k].toAccount;
                                            obj.toName = response.data[k].toName;
                                            obj.balance = response.data[k].balance;
                                            obj.transactionDate = response.data[k].transactionDate;
                                            obj.borrowFlag = response.data[k].borrowFlag=='借'?"转入":"转出";
                                            datas[k] = obj;
                                        }
                                        this.tableData = datas;
                                        this.dialogFormVisible=true;

                                    }).catch(function(err){
                                        Message.error(err);
                                    });
                            });
                        }else{
                            //存在，修改节点资金流向信息
                            var oldname = this.cy.getElementById(toAccountText).data('name');
                            oldname = oldname.lastIndexOf("时")==-1?"":oldname.substr(oldname.lastIndexOf("时"));
                            var toName = response.data[i][j].toName.length>6?response.data[i][j].toName.substring(0,3)+"...":response.data[i][j].toName;
                            var newname = "账号："+toAccountText.substring(toAccountText.length-5,toAccountText.length-1)
                                            +"\n姓名："+toName
                                            +"\n余额："+response.data[i][j].balance
                                            +"\n"+oldname
                                            +"\n"+borrowFlag+response.data[i][j].count;
                            this.cy.getElementById(toAccountText).data('name',newname);

                            this.cy.nodes("#"+toAccountText).on("click",(e)=>{
                                var datas=[];
                                this.$axios.post('http://192.168.100.116:8080/project/selectBankFlow',
                                    {
                                        projectId:this.$route.params.id.projectId,
                                        account:this.$route.params.id.account,
                                        toAccount:response.data[i][j].toAccount,
                                        transactionDateStrStart:this.dataStart,
                                        level:i,
                                        intervals:intervals,
                                    }).then((response)=>{
                                        for(let k=0;k<response.data.length;k++){
                                            var obj={};
                                            obj.index = k+1;
                                            obj.account = response.data[k].account;
                                            obj.toAccount = response.data[k].toAccount;
                                            obj.toName = response.data[k].toName;
                                            obj.balance = response.data[k].balance;
                                            obj.transactionDate = response.data[k].transactionDate;
                                            obj.borrowFlag = response.data[k].borrowFlag=='借'?"转入":"转出";
                                            datas[k] = obj;
                                        }
                                        this.tableData = datas;
                                        this.dialogFormVisible=true;

                                    }).catch(function(err){
                                        Message.error(err);
                                    });
                            });
                        }

                        //画边缘
                        var color = response.data[i][j].totalMoney+"";
                        //通过转账金额匹配边缘颜色
                        if(parseFloat(color)<0){
                            color = "pi";
                        }else if(parseFloat(color)>0 && parseFloat(color)<500){
                            color = "fiveH";
                        }else if(parseFloat(color)>=500 && parseFloat(color)<1000){
                            color = "oneT";
                        }else if(parseFloat(color)>=1000 && parseFloat(color)<5000){
                            color = "fiveT";
                        }else if(parseFloat(color)>=5000 && parseFloat(color)<10000){
                            color = "oneW";
                        }else if(parseFloat(color)>=10000 && parseFloat(color)<50000){
                            color = "fiveW";
                        }else if(parseFloat(color)>=50000 && parseFloat(color)<100000){
                            color = "tenW";
                        }else if(parseFloat(color)>=100000 && parseFloat(color)<500000){
                            color = "fiftyW";
                        }else {
                            color = "top";
                        }
                        if("贷"==response.data[i][j].borrowFlag){
                            var t = accountText;
                            accountText = toAccountText;
                            toAccountText = t;
                        }
                        if(edg.indexOf(accountText+toAccountText)==-1){
                            this.cy.add({
                                data:{
                                    source:accountText,
                                    target:toAccountText,
                                    weight: 0.3,
                                    group: color,
                                    networkId: 918,
                                    networkGroupId: 23,
                                    intn: true,
                                    rIntnId: i+""+j,
                                    id: i+""+j
                                },
                                position: {},
                                group: "edges",
                                removed: false,
                                selected: false,
                                selectable: true,
                                locked: false,
                                grabbed: false,
                                grabbable: true,
                                classes: ""
                            });

                        }
                    }
                    if(firstrowFlag&&firstrowEnd){
                        rownum+=parseInt(count/4)+1;
                        firstrowFlag = false;
                    }else{
                        rownum+=parseInt(count/7)+1;
                    }
                }
            }).catch(function(err){
                Message.error(err);
            });
        }
    }
    
}
</script>
