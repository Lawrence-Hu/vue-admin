<template>
    <div>
        <template>
            <el-table
            :data="tableData"
            border
            style="width: 100%;margin-left:3%">
               <el-table-column
            prop="date"
            label="用户Id"
            width="300">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="200">
            </el-table-column>
            <el-table-column
            prop="date"
            label="日期"
            width="200">
            </el-table-column> 
            <el-table-column
            prop="address"
            label="备注">
            </el-table-column>
            <el-table-column
            prop="address"
            label="详情">
            <template slot-scope="scope">
                <el-button
                size="medium"
                @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                <el-button
                size="medium"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
            </template>
            </el-table-column>
        </el-table>
    </template>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form" inline="true">
           <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-right:8%">
            <el-button @click="dialogFormVisible = false">通过</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">驳回</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
export default {
     data() {
      return {
        dialogFormVisible:false,
        formLabelWidth: '120px',
        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible=true
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>
<style>

</style>

