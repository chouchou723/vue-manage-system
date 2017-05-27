import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin@qq.com',
    password: '123456',
    avatar: 'http://img1.3lian.com/img013/v2/51/d/101.jpg',
    duty:'TMK',
    name: '张老师',
    mail:'admin@qq.com',
    wechat:'weixinzhanghao'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

var template = [
{
    'date': '2017/05/05',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/15',
    'title': '9:30 学员访问',
    'desc': '学员访问'
}
,
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
}
,
{
    'date': '2017/05/11',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/13',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/04/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/03/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
},
{
    'date': '2017/05/01',
    'title': '9:30 学员访问',
    'desc': '学员访问'
}
]

const Task = Mock.mock(template);

// for (let i = 0; i < 2; i++) {
//   Task.push(Mock.mock({
//     'date': 'admin@qq.com',
//     'title': 'admin@qq.com',
//     'desc': 'admin@qq.com',
//   }));
// }

const Counter = Mock.mock({
    counter : 1
});

const MailCode = Mock.mock({
    mailCode : 1111
});
var menuTemp = [{
                    child:'首页',
                    index:'home',
                    class:'el-icon-my-shouye'
                },{
                    child:'任务提醒',
                    index:'calendar',
                    class:'el-icon-my-wodericheng'
                },
                {
                    child:'资源管理',
                    index:'3',
                    class:'el-icon-my-chengyuanguanli',
                    caidan:[{title:'资源池',index:'basetable'},
                    {title:'资源回收',index:'vuetable'}]
                },{
                    child:'学员管理',
                    index:'4',
                    class:'el-icon-my-xuexiyuandi',
                    caidan:[{title:'基本表单',index:'baseform'},
                    {title:'编辑器',index:'vueeditor'},
                    {title:'markdown',index:'markdown'},
                    {title:'文件上传',index:'upload'}]
                },
                {
                    child:'报表统计',
                    index:'5',
                    class:'el-icon-my-tongjifenxi',
                    caidan:[{title:'基础图表',index:'basecharts'},
                    {title:'混合图表',index:'mixcharts'}]
                },
                {
                    child:'组织架构',
                    index:'6',
                    class:'el-icon-my-moban',
                    caidan:[{title:'账号管理',index:'accountManage'},
                    {title:'职位管理',index:'jobManage'},
                    {title:'角色管理',index:'characterManage'},
                    {title:'部门管理',index:'departmantManage'}]
                }];
const MenuList = Mock.mock(menuTemp);

var departmentTemp = [
        {

          kind: '人事部',
          number: 0
        },{
          kind: '销售部',
          number: 10
        },{
          kind: '技术部',
          number: 1
        },{
          kind: '咨询事业部',
          number: 1
        },{
          kind: '教育事业部',
          number: 1
        },{
          kind: '产品事业部',
          number: 1
        }
]
const Department = Mock.mock(departmentTemp);

var characterTemp = [
        {

          kind: 'TMK专员',
          number: [1,2]
        },{
          kind: 'CC专员',
          number:[2,3]
        },{
          kind: '技术部',
          number:[2,4]
        },{
          kind: 'TMK主管',
          number: [1,4]
        },{
          kind: 'CC主管',
          number: [1,2]
        },{
          kind: '管理员',
          number: [1,2]
        }
]

const Character = Mock.mock(characterTemp)


var accountTemp = {
  "page":'1000',
"account":[
        {
           username: 'zhang',
           name:'zhang',
           phone:'123456789',
           campus:['徐汇校区','静安校区'],
           job:'TMK',
           depart:'销售部',
           lastLoginTime:'2017/5/15 15:23',
           loginTime:'2',
           status:"正常",
           sexual:'man',
           pass:'111111a',
           region:'shanghai'
        },{
           username: 'chang',
           name:'chang',
           phone:'2643567379',
           campus:'浦东校区',
           job:'CC',
           depart:'销售部',
           lastLoginTime:'2017/5/05 15:23',
           loginTime:'21',
           status:"正常"
        },{
           username: 'zhao',
           name:'zhao',
           phone:'1358674930',
           campus:'黄埔校区',
           job:'TMK主管',
           depart:'销售部',
           lastLoginTime:'2017/5/15 15:23',
           loginTime:'11',
           status:"停用"
        }, {
           username: 'zhang',
           name:'zhang',
           phone:'123456789',
           campus:['徐汇校区','静安校区'],
           job:'TMK',
           depart:'销售部',
           lastLoginTime:'2017/5/15 15:23',
           loginTime:'2',
           status:"正常",
           sexual:'man',
           pass:'111111a',
           region:'shanghai'
        },{
           username: 'chang',
           name:'chang',
           phone:'2643567379',
           campus:'浦东校区',
           job:'CC',
           depart:'销售部',
           lastLoginTime:'2017/5/05 15:23',
           loginTime:'21',
           status:"正常"
        },{
           username: 'zhao',
           name:'zhao',
           phone:'1358674930',
           campus:'黄埔校区',
           job:'TMK主管',
           depart:'销售部',
           lastLoginTime:'2017/5/15 15:23',
           loginTime:'11',
           status:"停用"
        },{
           username: 'zhao',
           name:'zhao',
           phone:'1358674930',
           campus:'黄埔校区',
           job:'TMK主管',
           depart:'销售部',
           lastLoginTime:'2017/5/15 15:23',
           loginTime:'11',
           status:"正常"
        },{
           username: 'zhao',
           name:'zhao',
           phone:'1358674930',
           campus:'黄埔校区',
           job:'TMK主管',
           depart:'销售部',
           lastLoginTime:'2017/5/15 15:23',
           loginTime:'11',
           status:"正常"
        },{
           username: 'zhao',
           name:'zhao',
           phone:'1358674930',
           campus:'黄埔校区',
           job:'TMK主管',
           depart:'销售部',
           lastLoginTime:'2017/5/15 15:23',
           loginTime:'11',
           status:"停用"
        },{
           username: 'zhao',
           name:'zhao',
           phone:'1358674930',
           campus:'黄埔校区',
           job:'TMK主管',
           depart:'销售部',
           lastLoginTime:'2017/5/15 15:23',
           loginTime:'11',
           status:"停用"
        }
],
"campus":[
{
          value: '徐汇区',
          label: '徐汇区'
        }, {
          value: '浦东新区',
          label: '浦东新区'
        }, {
          value: '宝山区',
          label: '宝山区'
        }, {
          value: '黄浦区',
          label: '黄浦区'
        }, {
          value: '静安区',
          label: '静安区'
        }, {
          value: '普陀区',
          label: '普陀区'
        }]




}






const Account = Mock.mock(accountTemp)


var campusTemp = [
{'label':'徐汇校区','value':'徐汇校区'},
{'label':'宝山校区','value':'宝山校区'},
{'label':'浦东校区','value':'浦东校区'},
{'label':'静安校区','value':'静安校区'},
{'label':'普陀校区','value':'普陀校区'}]

const CampusList = Mock.mock(campusTemp)



var jobTemp = [
{label:'CC专员',value:'CC专员'},{label:'TMK专员',value:'TMK专员'}]

const JobList = Mock.mock(jobTemp)


var cityTemp =[
        {
          label: '江苏省',
          options: [{
            value: 'nanjing',
            label: '南京'
          }, {
            value: 'wuxi',
            label: '无锡'
          }]
        },
        {
          label:'上海',
         options:[{
          value:'shanghai',
          label:'上海'
         }]
        },
        {
          label: '安徽省',
          options: [{
            value: 'hefei',
            label: '合肥'
          }, {
            value: 'wuhu',
            label: '芜湖'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }
 ]

 const CityList = Mock.mock(cityTemp)



 var departTemp = {
 'dd':[   {
          label:'销售部',
          ddata:[
          {
          kind: '销售经理',
          depart:'销售部',
          level:'无',
          range:[],
          number: 0
        },
        {
          kind: 'TMK主管',
          depart:'销售部',
          level:'销售经理',
          range:[],
          number: 1
        },{
          kind: 'TMK',
          depart:'销售部',
          level:'TMK主管',
          range:[],
          number:1
        },{
          kind: 'CC主管',
          depart:'销售部',
          level:'销售经理',
          range:[],
          number:1
        },{
          kind: 'CC',
          depart:'销售部',
           level:'CC主管',
          range:[],
          number: 1
        }
        ]

        },{
          label:'技术部',
          ddata:[{
          kind: '技术经理',
          depart:'技术部',
          level:'无',
          range:[],
          number:0
        },{
          kind: '技术主管',
          depart:'技术部',
          level:'技术经理',
          range:[],
          number: 1
        },{
          kind: '前端',
          depart:'技术部',
           level:'技术主管',
          range:[],
          number: 1
        }]
        

        }
    ],
'bb':[{label:'销售部',value:'sale'},{label:'技术部',value:'tech'}]
        
}
const DepartList = Mock.mock(departTemp)


var levelTemp ={
  'level':[{label:'无',value:'0'},{label:'销售经理',value:'1'},{label:'TMK主管',value:'2'},{label:'CC主管',value:'22'}],
  'ranges':[{
          value: '1',
          label: 'TMK专员权限'
        }, {
          value: '2',
          label: 'CC专员权限'
        }, {
          value: '3',
          label: 'TMK管理权限'
        }, {
          value: '4',
          label: 'CC管理权限'
        }, {
          value: '5',
          label: '系统管理员权限'
        }]
} 
const LevelList = Mock.mock(levelTemp)

export { LoginUsers, Users,Task,Counter,MailCode,MenuList,Department,Character,Account,CampusList,JobList,CityList,DepartList,LevelList };


['.el-icon-my-shouye','.el-icon-my--huoquxiaoxi','.el-icon-my--shezhi','.el-icon-my-shoujianxiang','.el-icon-my--xiaoxi']

.icon-wendang

.icon-shangchu

.icon-sousuo

.icon-xieyoujian

.icon-jichubangong

.icon-jihua

.icon-hetongguanli

.icon-shengpi

.icon-daiban

.icon-tongzhi

.icon-baobiaoguanli

.icon-yewuzhongxin

.icon-guanliyuancaozuo

.icon-xitongguanli

.icon-xialatubiao

.icon-xinzeng

.icon-caidan

.icon-xiugai

.icon-xiazaibaocun

.icon-shangchuanwenjian

.icon-tongxunlu

.icon-guanliyuan:before { content: "\e656"; }

.icon-yonhu:before { content: "\e657"; }

.el-icon-my-tongjifenxi:before { content: "\e65b"; }

.icon-gerenxinxi:before { content: "\e65d"; }

.icon-tongzhigonggao:before { content: "\e65e"; }

.icon-zhuanxierizhi:before { content: "\e65f"; }

.icon-rizhi:before { content: "\e660"; }

.icon-chayuerizhi:before { content: "\e661"; }

.el-icon-my-chengyuanguanli:before { content: "\e663"; }

.el-icon-my-wodericheng:before { content: "\e665"; }

.icon-richenganpai:before { content: "\e666"; }

.icon-richeng:before { content: "\e667"; }

.icon-chayuericheng:before { content: "\e668"; }

.icon-huiyijiyao:before { content: "\e669"; }

.icon-qita:before { content: "\e66a"; }

.icon-yibanrenwu:before { content: "\e66b"; }

.icon-daibanrenwu:before { content: "\e66d"; }

.icon-cailiaopinpai:before { content: "\e66e"; }

.icon-chengyuanyingyonchakanqi:before { content: "\e670"; }

.icon-chuchai:before { content: "\e671"; }

.icon-yonhuxinxipingtai:before { content: "\e672"; }

.icon-laiwangdanweipingtai:before { content: "\e673"; }

.icon-xitonggongju:before { content: "\e674"; }

.icon-zaixianyonhu:before { content: "\e675"; }

.el-icon-my-xuexiyuandi:before { content: "\e677"; }

.icon-gongsilei:before { content: "\e678"; }

.icon-zidian:before { content: "\e679"; }

.icon-weituoguanxiguanli:before { content: "\e67a"; }

.icon-kuaijieyingyon:before { content: "\e67b"; }

.icon-yoncheguanli:before { content: "\e67c"; }

.icon-kaoqinliuchengtongji:before { content: "\e67d"; }

.icon-yingyonchengxumuban:before { content: "\e67e"; }

.icon-jiaban:before { content: "\e680"; }

.icon-weizhi:before { content: "\e681"; }

.icon-tongyi:before { content: "\e684"; }

.icon-jujue:before { content: "\e685"; }

.icon-shouhui

.icon-xingzhengbangongguanli

.icon-dayinchulijian

.icon-zidianxinxipingtai

.icon-gongwen

.icon-xiangmu

.icon-cailiaochangjia

.icon-suishoupai

.icon-mima

.icon-wodejihua

.icon-huiyijiyao1

.icon-ziyuanxinxipingtai

.icon-liuchengchaoqitongji
.el-icon-my-moban

.icon-moban1

