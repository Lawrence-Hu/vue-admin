<template>
    <div>
     <div class="search" style="margin-top: 15px;width:30%;float:right;margin-right:11%">
      <el-input v-model="input" style="width:75%;" placeholder="请输入内容"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <template>
        <el-table
            :data="data.tableData5"
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品Id">
                    <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                    <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="市场价格">
                    <span>{{ props.row.marketPrice }}</span>
                </el-form-item>
                    <el-form-item label="销售数量">
                    <span>{{ props.row.sellNum }}</span>
                </el-form-item>
                    <el-form-item label="商品存货量">
                    <span>{{ props.row.stock }}</span>
                </el-form-item>
                    <el-form-item label="创建时间">
                    <span>{{ props.row.createTime }}</span>
                </el-form-item>
                    <el-form-item label="所属种类">
                    <span v-for="category in data.categories" :key="category.id">
                        {{category.id==props.row.category?category.name:""}}
                    </span>
                </el-form-item>
                    <el-form-item label="商品状态">
                    <span v-for="status in data.statuses" :key="status.id">
                        {{status.id==props.row.status?status.name:""}}
                    </span>
                </el-form-item>
                <el-form-item label="商品规格">
                    <span v-for="unit in data.units" :key="unit.id">
                        {{unit.id==props.row.unit?unit.name:""}}
                    </span>
                </el-form-item>
                <el-form-item label="是否在售">
                    <span>{{ props.row.isSell=="1"?"是":"否" }}</span>
                </el-form-item>
                <el-form-item label="是否推荐">
                    <span>{{ props.row.isRecom=="1"?"是":"否"  }}</span>
                </el-form-item>
                  <el-form-item label="是否新品">
                    <span>{{ props.row.isNew=="1"?"是":"否"  }}</span>
                </el-form-item>
                  <el-form-item label="是否热销">
                    <span>{{ props.row.isHot=="1"?"是":"否"  }}</span>
                </el-form-item>
                <el-form-item label="是否审核">
                    <span>{{ props.row.isVertify=="1"?"是":"否"  }}</span>
                </el-form-item>
                    <el-form-item label="是否轮播">
                    <span>{{ props.row.isCarosel=="1"?"是":"否"  }}</span>
                </el-form-item> 
                     <el-form-item label="商品描述">
                    <span>{{ props.row.desc=="1"?"是":"否"  }}</span>
                </el-form-item>               
                     <el-button type="text" @click="detail(props.row)">修改商品信息</el-button>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column
            label="商品ID"
            prop="id">
            </el-table-column>
            <el-table-column
            label="商品名称"
            prop="name">
            </el-table-column>
            <el-table-column
            label="商品价格"    
            prop="price">
            </el-table-column>
            <el-table-column
            label="所属用户"    
            prop="user">
            </el-table-column>
            <el-table-column
            label="商品数量"    
            prop="stock">
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageNum"  class="pagination">
        </el-pagination>
        <!-- Form -->
        <el-dialog title="用户信息修改" :visible.sync="dialogFormVisible">
        <el-form :inline="true" :model="form" >
            <el-form-item label="商品名称" :label-width="formLabelWidth" style="margin-right:3%">
                <el-input :disabled="true"  v-model="form.name" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>
          
            <el-form-item label="所属用户" :label-width="formLabelWidth" style="">
                <el-input :disabled="true" v-model="form.user" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>
            
            <el-form-item label="商品价格" :label-width="formLabelWidth" style="margin-right:3%">
                <el-input v-model="form.price" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>

            <el-form-item label="商品数量" :label-width="formLabelWidth" style="">
                <el-input v-model="form.stock" auto-complete="off" style="width:109%"></el-input>
            </el-form-item>

            <el-form-item label="是否推荐" :label-width="formLabelWidth" style="">
                <el-select v-model="form.isRecom" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否售卖" :label-width="formLabelWidth" style="">
                <el-select v-model="form.isSell" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="是否新品" :label-width="formLabelWidth" style="">
                <el-select v-model="form.isNew" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="商品状态" :label-width="formLabelWidth" style="">
                <el-select v-model="form.status" placeholder="">
                    <el-option v-for="status in data.statuses" :key="status.id"  :label="status.name" :value="status.id"></el-option>
                </el-select>
            </el-form-item>

             <el-form-item label="所属种类" :label-width="formLabelWidth" style="">
               <el-select v-model="form.category" placeholder="">
                    <el-option v-for="category in data.categories" :key="category.id" :label="category.name" :value="category.id" ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="产品规格" :label-width="formLabelWidth" style="">
                <el-select v-model="form.unit" placeholder="" >
                   <el-option v-for="unit in data.units" :key="unit.id" :label="unit.name" :value="unit.id"></el-option>
                </el-select>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer" style="clear:both;margin-right:12%">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="open2()">确 定</el-button>
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
  export default {
    data() {
      return {
          data:{
            tableData5: [{
            id: '12987122',
            name:'小米8',
            price: '3500',
            marketPrice: '6800',
            unit:1,
            isSell:'0',
            isHot: '0',
            isRecom:'0',
            isNew:'0',
            isVertify:'0',
            createTime: '2018/05/02',
            category: 1,
            isCarosel:'0',
            status:1,
            sellNum:'18',
            stock:'255',
            desc:'小米手机,碉堡了!',
            user:'胡超', 
            }],
            statuses:[{id:1,name:"未认证"},{id:2,name:"已认证"}],
            categories:[{id:1,name:"手机"},{id:2,name:"家具"}],
            units:[{id:1,name:"数量/件"},{id:2,name:"数量/只"}]
        },

        form:'',
        input:'',
        pageNum:12,
        dialogFormVisible: false,
        formLabelWidth: '120px',
      }
    },
    methods: {
      detail(scope){
        this.form = JSON.parse(JSON.stringify(scope));
        this.dialogFormVisible=true;
      },
      open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         console.log(this.form)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
         this.dialogFormVisible=false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        }); 
      }
    }
  }
</script>
