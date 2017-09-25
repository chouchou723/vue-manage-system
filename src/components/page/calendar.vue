<template>
    <div id='calendarcc'>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-wodericheng"></i> 任务提醒</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='editPass'>
            <h3 class='editPassH3'>任务提醒({{number}})</h3>
        </div>
        <vue-event-calendar :events="demoEvents"  @month-changed="handleMonthChanged">
            <template scope="props" class="event-item1">
                <div v-for="(event, index) in props.showEvents" class="event-item" @click='goTo(event)'>
                    <div >
                        <div class='caltitle'>
                            <div class="caldiv" > <i class="el-icon-my-tongzhigonggao"></i>{{event.title}}</div>
                            <!-- <div style="float:right;color:grey;margin-top:5px" >{{event.creat.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')?event.creat.substring(11): event.creat.substring(0,10).replace(/0/g,'').replace(/\-/g,'') - new Date().toLocaleString().substring(0,9).replace(/0/g,'').replace(/\-/g,'') == -1? '昨天'+event.creat.substring(11) :event.creat.substring(5)}}</div> -->
                        </div>
                        <div class='calmin'>
                            <div class='calcontent'>学生姓名:<span class='calbold'>{{event.uname}}</span></div>
                            <div   class='calcontent'>联系内容:{{event.desc}}</div>
                        </div>
                    </div>
                    <!-- In here do whatever you want, make you owner event template -->
                </div>
            </template>
        </vue-event-calendar>
       <!--   <el-dialog  :visible.sync="dialogFormVisibleCal" :close-on-click-modal="no" top='9%' size='full' CalendarDialog>
         <my-event></my-event>
         </el-dialog> -->
    </div>
</template>
<script>
var token
// import {
//     mapActions
// } from 'vuex';
import {
    getTask
} from '../../api/api';
export default {
    data() {
            return {
                // dialogFormVisibleCal:false,
                demoEvents: [],
                number: '',
                // no:false
            }
        },
        methods: {
            goTo(data){
                 this.$router.push(data.url);
            },
            handleMonthChanged(month) {
                let year = month.substring(0, 4);
                let mon = month.substring(5, 7);
                let day = '23';
                let date = year + '-' + mon + '-' + day;
                let para = {
                    date: date
                }
                getTask(para, token).then(res => {
                    this.demoEvents = res.map(item => {
                        // if(item.length !=0){

                        return {
                            date: item.remind_time.substring(0, 10).replace(/-/g, '/'),
                            title: item.topic,
                            desc: item.remark,
                            creat: item.create_at.substring(0, 16),
                            uname:item.customer_name,
                            // id:item.uid
                            url:item.url
                        }
                        // }
                    })

                })
            }
        },
        beforeCreate() {
            let user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            
            let para = {
                date: new Date().toLocaleDateString()
            }
            getTask(para, token).then(res => {
                this.demoEvents = res.map(item => {
                    return {
                        date: item.remind_time.substring(0, 10).replace(/-/g, '/'),
                        title: item.topic,
                        desc: item.remark,
                        creat: item.create_at.substring(0, 16),
                        uname:item.customer_name,
                        // id:item.uid
                        url:item.url
                    }
                })
                let arr = this.demoEvents.filter(item => {
                    item.date == new Date().toLocaleDateString()
                })
                this.number = arr.length
            }).then(() => {
                let a = new Date().toLocaleDateString().replace(/-/g, '/');
                this.$EventCalendar.toDate(a)
            })
        }
}
</script>
<style>
.cal-events {
    overflow: auto;
}

.cal-events::-webkit-scrollbar {
    display: none
}

.__vev_calendar-wrapper .cal-wrapper .cal-body {
    background-color: white;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.__vev_calendar-wrapper .cal-wrapper .cal-header {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

/*.event-item {
    border: 1px solid gainsboro;
}*/


/*.event-item .time{
    display: none
}*/

.cal-body div p:hover {
    cursor: pointer;
}

.editPass {
    width: 100%;
    position: relative;
    height: 35px;
    background-color: white;
    margin-top: 30px;
    padding-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.editPassH3 {
    margin-bottom: 15px;
    margin-left: 10px;
}
.CalendarDialog{
    /*width: 80%;*/
    margin-left: 52px;
    z-index: 3000
}
.event-item:hover{
    cursor: pointer
}
.caltitle{
height:35px;border-bottom:1px solid  gainsboro
}
.caldiv{
float:left;color:#1fb5ad;margin-left:1px;font-size:20px
}
.calmin{
    min-height:25px
}
.calcontent{
margin-top:5px;color:grey
}
.calbold{
    font-weight:bold
}
</style>
