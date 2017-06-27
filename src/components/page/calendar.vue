<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-wodericheng"></i> 任务提醒</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='editPass'>
            <h3 class='editPassH3'>任务提醒({{number}})</h3>
        </div>
        <vue-event-calendar :events="demoEvents"  @day-changed="handleDayChanged" @month-changed="handleMonthChanged">
            <template scope="props" class="event-item1">
                <div v-for="(event, index) in props.showEvents" class="event-item" >
                    <div >
                        <div style="height:35px;border-bottom:1px solid  gainsboro">
                            <div style="float:left;color:#1fb5ad;margin-left:1px;font-size:20px"> <i class="el-icon-my-tongzhigonggao"></i>{{event.title}} 提醒</div>
                            <div style="float:right;color:grey;margin-top:5px" >{{event.creat.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')?event.creat.substring(11): event.creat.substring(0,10).replace(/0/g,'').replace(/\-/g,'') - new Date().toLocaleString().substring(0,9).replace(/0/g,'').replace(/\-/g,'') == -1? '昨天'+event.creat.substring(11) :event.creat.substring(5)}}</div>
                        </div>
                        <div style="min-height:25px">
                            <div style="margin-top:10px;color:grey">{{event.desc}}</div>
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
import {
    mapActions
} from 'vuex';
import {
    getTask
} from '../../api/api';
// import myEvent from './userDetail.vue';
export default {
    data() {
            return {
                // dialogFormVisibleCal:false,
                demoEvents: [],
                number: '',
                // no:false
            }
        },
    //     components: {
    //     'my-event': myEvent
    // },
        // events:{
        //     'child-msg':function(event){
        //         console.log(1)
        //     }
        // },
        methods: {
            // pop(event) {
            //     console.log(event);
            //     this.dialogFormVisibleCal = true;
            //     // this.$emit('child-msg',event)
            // },
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
                            title: item.remind_time.substring(11, 16),
                            desc: item.remark,
                             creat: item.create_at.substring(0, 16)
                        }
                        // }
                    })

                })
            },
            handleDayChanged(day) {
                //      let arr = document.getElementsByClassName('eeventtitle');
                //  console.log(arr)
                //  var newItem=document.createElement("i")
                //  newItem.className = 'el-icon-my-tongzhigonggao'
                // for(let i =0;i<arr.length;i++){

                //          arr[i].insertBefore(newItem,arr[i].childNodes[0])
                // }
            },
            ...mapActions([
                'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
                'decrement'
            ])
        },
        beforeCreate() {
            let user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            let a = new Date().toLocaleDateString().replace(/-/g, '/');

            let para = {
                date: new Date().toLocaleDateString()
            }
            getTask(para, token).then(res => {
                this.demoEvents = res.map(item => {
                    return {
                        date: item.remind_time.substring(0, 10).replace(/-/g, '/'),
                        title: item.remind_time.substring(11, 16),
                        desc: item.remark,
                        creat: item.create_at.substring(0, 16)
                    }
                })
                let arr = this.demoEvents.filter(item => {
                    item.date == new Date().toLocaleDateString()
                })
                let length = arr.length
                this.number = length

            }).then(() => {

                this.$EventCalendar.toDate(a)
            })
        },
        mounted() {
            //  let arr = document.getElementsByClassName('eeventtitle');
            //  // console.log(arr)
            //  var newItem=document.createElement("i")
            //  newItem.className = 'el-icon-my-tongzhigonggao'
            // for(let i =0;i<arr.length;i++){

            //          arr[i].insertBefore(newItem,arr[i].childNodes[0])
            // }
        }
}
</script>
<style>
.cal-events {
    overflow: auto;
}

::-webkit-scrollbar {
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
</style>
