<template>
<div>
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-wodericheng"></i> 任务提醒</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
  <vue-event-calendar :events="demoEvents"  @click.native="increment">
      <template scope="props" class="event-item1" >
        <div v-for="(event, index) in props.events" class="event-item">
          <!-- In here do whatever you want, make you owner event template -->
            
          {{event}}
        </div>
      </template>
    </vue-event-calendar>
    </div>
</template>

<script>
 import {mapActions} from 'vuex';
 import { taskList } from '../../api/api';
export default {
  data () {
    return {
      demoEvents:[]
    }
  },
  methods:{
    getData:function(){
                let self = this;
                let para = {
          demoEvents:this.demoEvents
        };
        //NProgress.start();
        taskList(para).then((res) => {
          //NProgress.done();
          this.demoEvents = res;
        });
            },
      ...mapActions([
      'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
      'decrement'
    ])
  },
 created(){
            this.getData();
        }
}
</script>
<style>
.events-wrapper{
  overflow-y: scroll;
}
</style>