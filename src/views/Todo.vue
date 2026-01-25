<template>
  <div style="padding: 10px;">
    <el-row>
      <el-col :span="24">
        <el-form :model="queryParams" label-width="auto">
          <el-form-item label="时间" style="width: 300px;">
            <el-date-picker v-model="queryParams.date" type="daterange" range-separator="~" start-placeholder="开始时间"
              end-placeholder="结束时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
          </el-form-item>
          <el-form-item label="待办" style="width: 300px;">
            <el-input v-model="queryParams.remark" placeholder="待办事项" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="info" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="list" border style="width: 100%" height="500px">
          <el-table-column prop="date" label="时间" width="180" />
          <el-table-column prop="remark" label="待办" />
          <el-table-column label="操作" width="80" align="center">
            <template #default="{ row }">
              <el-button @click="handleUpdate(row)" type="text" :icon="Edit"></el-button>
              <el-button @click="handleRemove(row)" type="text" :icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination background layout="prev, pager, next" v-model:page-size="queryParams.limit"
          v-model:current-page="queryParams.page" :total="pagination.total" @change="getList" />
      </el-col>
    </el-row>
  </div>

  <el-dialog v-model="showDialog" :title="title" width="800" destroy-on-close draggable>
    <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="auto">
      <el-form-item prop="remark">
        <el-input v-model="form.remark" :rows="4" type="textarea" placeholder="记录一下吧！" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submit" :loading="buttonLoading">保存</el-button>
      <el-button @click="showDialog = false">取消</el-button>
    </template>
  </el-dialog>

</template>
<script setup>
import { list as todoList, info, add, update, remove } from '@/api/todo'
import { onBeforeMount, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
onBeforeMount(() => {
  getList()
})
const queryParams = reactive({
  page: 1,
  limit: 10,
})
const pagination = ref({})
const list = ref([])
const showDialog = ref(false)
const buttonLoading = ref(false)
const title = ref('')
const form = ref({})
const ruleFormRef = ref()
const rules = reactive({
  remark: [
    {
      required: true,
      message: '空空如也哦~~',
      trigger: 'change',
    },
  ],
})
// 获取列表
const getList = async () => {
  if (queryParams.date) {
    queryParams.start = queryParams.date[0]
    queryParams.end = queryParams.date[1]
  } else {
    queryParams.start = ''
    queryParams.end = ''
  }
  let res = await todoList(queryParams)
  list.value = res.data
  pagination.value = res.pagination
}
const handleSearch = () => {
  queryParams.page = 1
  getList()
}
// 新增
const handleAdd = () => {
  title.value = '新增'
  form.value = {}
  showDialog.value = true
}
// 修改
const handleUpdate = async (row) => {
  title.value = '修改'
  let res = await info(row.id)
  form.value = res.data
  showDialog.value = true
}
// 保存
const submit = () => {
  ruleFormRef.value.validate(async valid => {
    if (valid) {
      try {
        buttonLoading.value = true
        if (!form.value.id) {
          await add(form.value)
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
          getList()
        } else {
          await update(form.value.id, form.value)
          ElMessage({
            message: '修改成功',
            type: 'success',
          })
          getList()
        }
        showDialog.value = false
      } finally {
        buttonLoading.value = false
      }
    }
  })
}

// 删除
const handleRemove = async (row) => {
  await remove(row.id)
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
  getList()
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>