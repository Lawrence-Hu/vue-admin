<template>
    <div>
        <template>
            <el-table
            :data="data"
            border>
            <el-table-column
            prop="userId"
            label="用户Id"
            width="300">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="200">
            </el-table-column>
            <el-table-column
            prop="createdTime"
            label="日期"
            width="200">
            </el-table-column> 
            <el-table-column
            prop="address"
            label="地址">
            </el-table-column>
            <el-table-column
            label="详情">
            <template slot-scope="scope">
                <el-button
                size="medium"
                @click="detail(scope.$index, scope.row)">详情</el-button>    
                <el-button
                type="danger">驳回</el-button>
            </template>      
            </el-table-column>
        </el-table>
    </template>
    <el-dialog title="用户认证" :visible.sync="dialogFormVisible"  >
        <el-form :model="form" :inline="true">
            <div class="block" style="width:58%;float:right" >
                <el-carousel trigger="click" height="250px" >
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>  
            </div>
            <el-form-item label="认证号" label-width="68px">
                <el-input  :disabled="true" :value="form.userId|idFilter"></el-input>
            </el-form-item>
           <el-form-item label="姓名" label-width="68px">
                <el-input  :disabled="true" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input :disabled="true" v-model="form.creditId"></el-input>
            </el-form-item>
            <el-form-item label="当前住址">
                <el-input :disabled="true" v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="信息" v-model="form.comments">
                <el-input type="textarea" style ="width:250%;height:400%" :disabled="true" v-model="form.name"></el-input>
            </el-form-item>
             <el-button type="danger" @click="handleAudit(form,false)" style="float:right;margin-right:40px;margin-top:60px">驳回</el-button>
             <el-button type="success" @click="handleAudit(form,true)"  style="float:right;margin-right:20px;margin-top:60px">通过</el-button>
        </el-form>
    </el-dialog>
</div>
</template>
<script>
import {userAuthAudit,allUserAuthByPages} from "@/api/user"
export default {
     data() {
      return {
        dialogFormVisible:false,
        formLabelWidth: '120px',
        form: {
        },
        data: []
      }
    },
    beforeMount:function(){
        allUserAuthByPages(2,1).then((resp)=>{
            this.data=resp.data.records
        })
    },
    filters:{
        idFilter:function(value){
            if(!value){
                return;
            }
            return value.substring(0,15)
        }
    },
    methods: {
      detail(index, row) {
        this.dialogFormVisible=true
        this.form=row
      },
      async handleAudit(form,isPassed) {
       //数据封装
       var params = {
        "id":form.id,
        "user_id":form.userId,
        "isPassed":isPassed
        }
        try{
            await userAuthAudit(params)
            this.dialogFormVisible = false
        }catch(err){
            this.dialogFormVisible = false
        }
      }
    }
}
</script>
<style >
  .el-input__inner{
      height:43px;
      width: 120%;
  }
 .el-textarea__inner{
     padding:15px 15px;
     height: 80px;
 }  
</style>

