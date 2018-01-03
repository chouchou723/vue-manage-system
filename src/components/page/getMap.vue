<template>
    <div>
        <div style="z-index:1;background:white;width:100%;">

                <el-input placeholder="搜索地址" icon="search" v-model="location" @keyup.enter.native="aa" :on-icon-click="aa" style='width:250px;float:left;margin-right:5px;' > </el-input>
                <span style='float:left;line-height:36px;margin-right:5px;'>坐标:</span>    <div style='width:200px;float:left;line-height:36px;' id="aa"></div>
                <el-button type="primary" size="mid" style="float:right" @click="closeD">确定</el-button>
        </div>
            <!-- <button @click="aa">aaa</button> -->
           
        <div id="container">
        </div>
    </div>
  </template>
  
  <script>
      import {
    mapActions
} from 'vuex';
  export default {
    props: {
  	location:''
  },
    data () {
      return {
        msg: '',
        map:{},
        aab:''
      }
    },
    mounted(){
        this.map1();
        this.aa();
    },
    methods:{
        ...mapActions([
                'setLC'
            ]),
        closeD(){
            if(document.getElementById("aa").innerHTML!=''){

            let a = document.getElementById("aa").innerHTML;
            // console.log(a)
            // this.setLC(this.aab)
            this.$emit('closeD',a)
            }else{
                this.$message.info('请选择地点')
            }
        },
        aa(){   
            let map = this.map;
            var local =new BMap.LocalSearch(map, {
                renderOptions:{map: map}
            });
            let aa = local.search(this.location);
            local.setSearchCompleteCallback(rs=>{
                let b = rs.getPoi(0);
                let p = b.point;
            document.getElementById("aa").innerHTML = p.lng+" , "+p.lat;
            })        
            
        },
        map1(){
  
            this.map = new BMap.Map("container");   
            let map = this.map       // 创建地图实例  
          var point = new BMap.Point(121.446288227952,31.19881188473782);  // 创建点坐标  
          map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        //   var marker = new BMap.Marker(point);
        //   map.addOverlay(marker);             //开启标注
          var opts = {
                  width : 250,     // 信息窗口宽度
                  height: 80,     // 信息窗口高度
                  title : "信息窗口" , // 信息窗口标题
                  enableMessage:true//设置允许信息窗发送短息
                };
                //点击地图，获取经纬度坐标
            map.addEventListener("click",function(e){
                document.getElementById("aa").innerHTML = e.ab.point.lng+" , "+e.ab.point.lat;
                // this.aab = e.point.lng+" , "+e.point.lat;
                // console.log(e)
                
            });
           var content = '上海'           //开启窗口
            //   map.addOverlay(marker);               // 将标注添加到地图中
            //   addClickHandler(content,marker);
        //    function addClickHandler(content,marker){
        //       marker.addEventListener("mouseover",function(e){
        //         openInfo(content,e)}
        //       );
        //     };
            // function openInfo(content,e){
            //   var p = e.target;
            //   var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            //   var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
            //   map.openInfoWindow(infoWindow,point); //开启信息窗口
            // };
            
          //向地图添加控件
            // var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
                // scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
                // map.addControl(scaleControl);
                // var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
                // map.addControl(navControl);
                // var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
                // map.addControl(overviewControl);
            },
    },
  }
  </script>
  
  <style scoped>
          /* html{height:100%}  
          body{height:100%;margin:0px;padding:0px}   */
          #container{height: 500px;width: 100%;}  
  </style>
  