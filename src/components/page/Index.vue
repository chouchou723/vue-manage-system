<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-shouye"><b>&nbsp;首页</b></i> </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
  	  <div class="box_1">
        
        <div class="left_a">
        	<b>日数据对比统计</b>
        </div>
        
        <div class="right_a">
        	<b>客户发展趋势</b>
        </div>
        
        <div class="left_b">
       <ul>
        	<li>
        		<dl>
        			<dt>较上周({{xzy}})</dt>
        			<dd>80</dd>
        			<dd>新资源</dd>
        		</dl>
        	</li>
        	<li>
        		<dl>
        			<dt>较上周({{yyl}})</dt>
        			<dd>80</dd>
        			<dd>邀约量</dd>
        		</dl>
        	</li>
        	<li>
        		<dl>
        			<dt>较上周({{dfl}})</dt>
        			<dd>80</dd>
        			<dd>到访量</dd>
        		</dl>
        	</li>
        	<li>
        		<dl>
        			<dt>较上周({{qdl}})</dt>
        			<dd>80</dd>
        			<dd>签单量</dd>
        		</dl>
        	</li>
        	<li>
        		<dl>
        			<dt>较上周({{dflv}})</dt>
        			<dd>80</dd>
        			<dd>到访率</dd>
        		</dl>
        	</li>
        	<li>
        		<dl>
        			<dt>较上周({{qdl}})</dt>
        			<dd>80</dd>
        			<dd>签单率</dd>
        		</dl>
        	</li>


       </ul> 	
        </div>	
        
        <div class="right_b">
        </div>
        
    </div>
    
    
    <div class="box_2">
    	<div class="left_c">
    		<div class="left_os">
    			<b>系统通知</b>
    			<a href=""><span>更多</span></a>
    		</div>
    		
    		<div class="left_tz">
    			<dl>
    				<dt>徐家汇校区通知（{{}}）</dt>
    				<dd>报告系统将成为什么……模块买买买</dd>

    			</dl>
    			<dl>
    				<dt>徐家汇校区通知（{{}}）</dt>
    				<dd>报告系统将成为什么……模块买买买</dd>
   
    			</dl>
    			<dl>
    				<dt>徐家汇校区通知（{{}}）</dt>
    				<dd>报告系统将成为什么……模块买买买</dd>

    			</dl>
    			<dl>
    				<dt>徐家汇校区通知（{{}}）</dt>
    				<dd>报告系统将成为什么……模块买买买</dd>
    	
    			</dl>
    			<dl>
    				<dt>徐家汇校区通知（{{}}）</dt>
    				<dd>报告系统将成为什么……模块买买买</dd>
   
    			</dl>
    			
    		</div>
    	</div>
    </div>
    
        
        
        <!--<div class="ms-doc">
            <h3>HOme</h3>
            <article>
                <h1>manage-system</h1>
                <br>
            </article>
        </div>-->
	 </div>
	 
	 
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
    
    
</script>

<style scoped>
	.box_2{
		width: 560px;
		height:365px;
		background-color: #FFFFFF;
		display: block;
		float: left;
		margin-top: 20px;
	}
	
	.left_b dl {
		text-align: center;
		padding-top: 40px;
	}
	.left_b li {
		display: block;
		width: 183px;
		margin-right: 5px;
		margin-bottom: 5px;
		height: 155px;
		float: left;
		background-color: #FFFFFF;
	
	}
	.left_b ul li:nth-child(3n){
		margin-right: 0;
	}
	
	li .last {
		margin-right: 0;
		
	}
	.box_1{
		
		width: 1130px;
		display: block;
		
	}
	.left_a{
		width: 550px;
		height: 50px;
		background-color:#FFFFFF ;
		float: left;
		margin-right: 10px;
		margin-bottom: 10px;
		line-height: 50px;
		padding-left: 10px;
	}
	.right_a{
		width: 550px;
		height: 50px;
		background-color: #FFFFFF;
		float: left;
		margin-bottom: 10px;
		line-height: 50px;
		padding-left: 10px;
	}
	

	.left_b{
		height: 315px;
		width: 560px;
		background-color: #f3f3f3;
		float: left;
		margin-right: 10px;
		
	}
	.right_b{
		height: 315px;
		width:560px;
		background-color: #FFFFFF;
		float: left;
	}
	.crumbs{
		width: 100%;
		height: 44px;
		background-color: #FFFFFF;
		display: block;		
	}
	.el-icon-my-shouye{
		padding-top: 13px;
		color: #1fb5ad;
		font-size: 16px;
		padding-left:15px ;
	}
    /*ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }*/
</style>