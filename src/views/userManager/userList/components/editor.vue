<template>
    <div>
        <el-dialog  :title="title" style="width:500px" v-model="dialogFormVisible">
            <el-form :model="form">
                <el-form-item v-if="module==='editor'" label="用户ID" :label-width="formLabelWidth">
                    <el-input v-model="form.data.id" autocomplete="off" :readonly="module==='editor'"  />
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.data.name" autocomplete="off" :readonly="module==='editor'" />
                </el-form-item>
                <el-form-item label="用户密码" :label-width="formLabelWidth">
                    <el-input v-model="form.data.password" autocomplete="off"  />
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model.number="form.data.age" autocomplete="off"  />
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.data.email" autocomplete="off"  />
                </el-form-item>
                <el-form-item label="用户电话" :label-width="formLabelWidth">
                    <el-input v-model="form.data.phone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="用户授权状态" :label-width="formLabelWidth">
                    <div class="mb-2 flex items-center text-sm">
                        <el-radio-group v-model="form.data.status" class="ml-4">
                            <el-radio :label='0' size="large">不授权</el-radio>
                            <el-radio :label='1' size="large">授权</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button type="warning" @click="dialogFormVisible = false">取消</el-button>
                <el-button type="success" @click="submit">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { editorUser} from '@/api/user';
import { ElMessage } from 'element-plus';
const formLabelWidth = '140px';
let module = ref();
let dialogFormVisible = ref(false);
let form = reactive({
    data: {
        id: null,
        name: null,
        password: null,
        age: null,
        email: null,
        phone: null,
        status: 0,
    }
});
onMounted(() => {
     
})
let title = ref("");
const add = () => {
    dialogFormVisible.value=true;
    module.value="add";
    title.value="新增用户";
    form.data = {
        id: null,
        name: null,
        password: null,
        age: null,
        email: null,
        phone: null,
        status: 0,
    };
}
const editor = (item: any) => {
    dialogFormVisible.value=true;
    module.value="editor";
    title.value="编辑用户";
    //form.data = item;
    form.data=JSON.parse(JSON.stringify(item));
    form.data.password=null;
    console.log(form.data);
    
}
const submit =async () => {
    if(module.value==="add"){
        console.log("add");
        console.log(form.data);
    } else {
        console.log("editor");
        console.log(form.data);
        const result: any = await editorUser({ ...form.data, status: form.data.status + '' });
        console.log(result);
        if (result.code == 1001) {
            dialogFormVisible.value = false;
            refreshData();
            ElMessage({
                type: 'success',
                message: '已成功编辑',
            })
        }else{
            ElMessage({
                type: 'error',
                message: result.message,
            })
        }
    }
}
interface item {
    id: null,
    name: null,
    age: null,
    date: null,
    email: null,
    phone: null,
    status: 0,
}
defineExpose({add, editor});
defineProps<{
    refreshData:Function
}>();
</script>

<style lang="scss" scoped>
.dialog-footer{
    padding: 5px;
}
</style>