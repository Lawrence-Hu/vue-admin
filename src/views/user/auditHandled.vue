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
            label="创建日期"
            width="200">
            </el-table-column> 
            <el-table-column
            prop="address"
            label="备注">
            </el-table-column>
            <el-table-column
            label="详情">
            <template slot-scope="scope">
                <el-button
                size="medium"
                @click="detail(scope.$index, scope.row)">详情</el-button>    
                <el-button
                :type="scope.row.status == true ? 'success' : 'danger'" size="medium"
                :disabled="true">{{scope.row.status == true? "已通过" : "已驳回"}}</el-button>
            </template>      
            </el-table-column>
        </el-table>
    </template>
    <el-dialog title="用户认证" :visible.sync="dialogFormVisible">
        <el-form :model="form" :inline="true">
            <div class="block" style="width:58%;float:right" >
                <el-carousel trigger="click" height="250px" >
                    <el-carousel-item v-for="item in form.imgs" :key="item.id">
                        <h3>{{ item.url }}</h3>
                    </el-carousel-item>
                </el-carousel>  
            </div>
            <el-form-item label="认证号" label-width="68px">
                <el-input :disabled="true" :value="form.userId|idFilter"></el-input>
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
            <el-form-item label="信息">
                <el-input type="textarea" style ="width:250%;height:400%" :disabled="true" v-model="form.comments"></el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>
<script>
import {allUserAuthHandledByPages} from '@/api/user'
export default {
     name:'Audit',
     data() {
      return {
        dialogFormVisible:false,
        formLabelWidth: '120px',
        form: {
        },
        data: [],
      }
    },
    beforeMount:function(){
        allUserAuthHandledByPages(2,1).then((resp)=>{
            this.data=resp.data.records
        }).catch(()=>{})
    },
    filters:{
        idFilter:function(value){
            return !value?'':value.substring(0,15)
        }
    },
    methods: {
      detail(index, row) {
        this.dialogFormVisible=true
        this.form = row
      },
    }
}
</script>
<style >
 .el-input__inner{
      height:43px;
      width: 122%;
  }
 .el-textarea__inner{
     padding:15px 15px;
     height: 80px;
 }  
</style>

