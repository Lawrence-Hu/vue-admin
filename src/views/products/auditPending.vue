<template>
    <div>
        <template>
            <el-table
            :data="data"
            border>
            <el-table-column
            prop="product.productName"
            label="商品名称"
            width="200">
            </el-table-column>
            <el-table-column
            prop="product.productBrand.name"
            label="品牌"
            width="250">
            </el-table-column>
            <el-table-column
            prop="createdTime"
            label="创建日期"
            width="200">
            </el-table-column> 
            <el-table-column
            prop="product.description"
            label="商品描述">
            </el-table-column>
            <el-table-column
            label="详情">
            <template slot-scope="scope">
                <el-button
                size="medium"
                @click="detail(scope.$index, scope.row)">详情</el-button>    
                <el-button
                 type="danger" @click="handleAudit(scope.row,false,scope.$index)">驳回</el-button>
            </template>      
            </el-table-column>
        </el-table>
    </template>
      <!--分页-->
    <el-pagination background layout="prev, pager, next" :total="pageNum" 
        :page-size="pageSize" @current-change="pageChange" class="pagination"></el-pagination>

    <el-dialog title="用户认证" :visible.sync="dialogFormVisible"  >
        <el-form :model="form" :inline="true">
            <div class="block" style="width:58%;float:right" >
                <el-carousel trigger="click" height="250px" >
                    <el-carousel-item v-for="item in form.imgs" :key="item.url">
                        <h3>{{ item.url }}</h3>
                    </el-carousel-item>
                </el-carousel>  
            </div>
           <el-form-item label="产品名称" label-width="68px">
                <el-input :disabled="true" v-model="form.product.productName"></el-input>
            </el-form-item>
            <el-form-item label="产品价格">
                <el-input :disabled="true" v-model="form.product.shopPrice"></el-input>
            </el-form-item>
            <el-form-item label="产品库存">
                <el-input :disabled="true" v-model="form.product.stock"></el-input>
            </el-form-item>
            <el-form-item label="产品描述">
                <el-input :disabled="true" v-model="form.product.description"></el-input>
            </el-form-item>
            <el-form-item label="信息" v-model="form.comments">
                <el-input type="textarea" style ="width:250%;height:400%"  v-model="form.comments"></el-input>
            </el-form-item>
             <el-button type="danger" @click="handleAudit(form,false)" style="float:right;margin-right:40px;margin-top:60px">驳回</el-button>
             <el-button type="success" @click="handleAudit(form,true)"  style="float:right;margin-right:20px;margin-top:60px">通过</el-button>
        </el-form>
    </el-dialog>
</div>
</template>
<script>
import {userAuthAudit,allUserAuditByPages} from "@/api/user"
import {productAudit,productAuditConfirm} from "@/api/product"
export default {
     data() {
      return {
        dialogFormVisible:false,
        formLabelWidth: '120px',
        form: {
             product:{},
             comments:''
        },
        pageSize:1,
        pageNum:null,
        data: []
      }
    },
    mounted:function(){
        this.pageChange(1)
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
        pageChange(curtPage){
            productAudit(this.pageSize,curtPage,false).then((resp)=>{
                this.data=resp.data.records
                this.pageNum = resp.data.pages
            }).catch((err)=>{
                console.log(err)
            })
        },
      detail(index, row) {
        this.index = index
        this.dialogFormVisible=true
        this.form=row
      },
     async handleAudit(form,isPassed,index) {
         if(index!=null){
             this.index = index
         }
       //数据封装
       var params = {
        "audit_id":form.id,
        "product_id":form.product.id,
        "is_passed":isPassed,
        "comments":form.comments
        }
        
       await productAuditConfirm(params)
         this.data.splice(this.index,1)
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
    .pagination{
    float:right;
    margin-right: 5%;
    margin-top: 35%
  } 
</style>

