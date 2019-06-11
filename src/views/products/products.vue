<template>
    <div>
     <div class="search" style="margin-top: 15px;width:30%;float:right;margin-right:11%">
      <el-input v-model="input" style="width:75%;" placeholder="请输入内容"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <template>
        <el-table
            :data="products"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                    <span>{{ props.row.productName }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                    <span>{{ props.row.shopPrice }}</span>
                </el-form-item>
                <el-form-item label="市场价格">
                    <span>{{ props.row.marketPrice }}</span>
                </el-form-item>
                    <el-form-item label="销售数量">
                    <span>{{ props.row.saleNum }}</span>
                </el-form-item>
                    <el-form-item label="商品存货量">
                    <span>{{ props.row.stock }}</span>
                </el-form-item>
                    <el-form-item label="创建时间">
                    <span>{{ props.row.createTime }}</span>
                </el-form-item>

                <el-form-item label="商品规格">
                    <span v-for="unit in data.unit" :key="unit.id">
                        {{unit.productId==props.row.id?unit.name:""}}
                    </span>
                </el-form-item>
                  <el-form-item label="是否新品">
                    <span>{{ props.row.isNew?"是":"否"  }}</span>
                </el-form-item>
                  <el-form-item label="是否热销">
                    <span>{{ props.row.isHot?"是":"否"  }}</span>
                </el-form-item>
                <el-form-item label="是否审核">
                    <span>{{ props.row.isAudit?"是":"否"  }}</span>
                </el-form-item>
                    <el-form-item label="是否轮播">
                    <span>{{ props.row.isCarosel?"是":"否"  }}</span>
                </el-form-item> 
                     <el-form-item label="商品描述">
                    <span>{{ props.row.desc=="1"?"是":"否"  }}</span>
                </el-form-item>               
                     <el-button type="text" @click="detail(props.row)">修改商品信息</el-button>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column
            label="商品名称"
            prop="productName">
            </el-table-column>
            <el-table-column
            label="商品价格"    
            prop="shopPrice">
            </el-table-column>
            <el-table-column
            label="创建时间"    
            prop="createTime">
            </el-table-column>
            <el-table-column
            label="销售数量"    
            prop="saleNum">
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageNum"  class="pagination">
        </el-pagination>
        <!-- Form -->
        <el-dialog title="商品信息修改" width="850px" :visible.sync="dialogFormVisible">
        <el-form :inline="true" :model="form" >
            <el-form-item label="商品名称" :label-width="formLabelWidth" style="margin-right:3%">
                <el-input  v-model="form.productName" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>
                    
            <el-form-item label="商品价格" :label-width="formLabelWidth" style="margin-right:3%">
                <el-input v-model="form.shopPrice" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>

            <el-form-item label="商品数量" :label-width="formLabelWidth" style="margin-right:3%">
                <el-input v-model="form.stock" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>

            <el-form-item label="是否售卖" :label-width="formLabelWidth" style="">
                <el-select v-model="form.isSale" placeholder="">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="是否新品" :label-width="formLabelWidth" style="">
                <el-select v-model="form.isNew" placeholder="">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="是否热销" :label-width="formLabelWidth" style="">
                <el-select v-model="form.isHot" placeholder="">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否已审核" :label-width="formLabelWidth" style="">
                <el-select v-model="form.isAudit" placeholder="">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否纳入轮播" :label-width="formLabelWidth" style="">
                <el-select v-model="form.isCarosel" placeholder="">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="所属种类" :label-width="formLabelWidth" style="">
               <el-select v-model="form.cateId" placeholder="">
                    <el-option v-for="category in data.category" :key="category.id" :label="category.name" :value="category.id" ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="产品规格" :label-width="formLabelWidth" style="">
                <el-select v-model="form.unitId" placeholder="" >
                   <el-option v-for="unit in data.unit" :key="unit.id" :label="unit.name" :value="unit.id"></el-option>
                </el-select>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer" style="clear:both;margin-right:12%">
            <el-button @click=" dialogFormVisible=false;">取 消</el-button>
            <el-button type="primary" @click="submit(form)">确 定</el-button>
        </div>
        </el-dialog>
    </template>
  </div>
</template>
<style scoped>
  .search {
    display: flex;
    justify-content: space-around
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .pagination{
    float:right;
    margin-right: 5%;
    margin-top: 32%;
  }
  .el-form--inline .el-form-item{
      padding-right: 8%;
  }
</style>

<script>
import { allProducts,updateProducts } from "@/api/product"
  export default {
    data() {
      return {
        data:{},
        products:[],
        form:'',
        input:'',
        pageNum:12,
        row:null,
        dialogFormVisible: false,
        formLabelWidth: '120px',
      }
    },
    beforeMount:function(){
      console.log(this)
        allProducts(2,1).then((resp)=>{
          this.products = resp.data.products.records
          this.data = resp.data
        })
    },
    methods: {
      detail(row){
        this.row = row
        this.form = JSON.parse(JSON.stringify(row))
        this.dialogFormVisible=true;
      },
      submit(form) {
        this.$confirm('确定修改商品信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose:(action,instance,done)=>{
              if(action==='confirm'){
                updateProducts(form)
                for (const key in form) {
                    this.row[key] = form[key]
                }
                this.dialogFormVisible = false
                done()
              }else{
                done()
              }
            }
            }).catch(()=>{
              this.$message({
              type: 'error',
              message: '用户取消操作'
              });
            })
      }
    }
  }
</script>
