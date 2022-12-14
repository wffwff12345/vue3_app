<template>
    <div>
        <el-dialog :title="viewModule ? '用户详情' : editorModule ? '编辑用户' : '新增用户' " style="width:500px" v-model="dialogFormVisible" :before-close="handleClose">
            <el-form :model="form">
                <el-form-item v-if="editorModule||viewModule" label="用户ID" :label-width="formLabelWidth">
                    <el-input v-model="form.data.id" autocomplete="off" :readonly="editorModule||viewModule" />
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.data.name" autocomplete="off" :readonly="editorModule||viewModule" />
                </el-form-item>
                <el-form-item v-if="!viewModule" label="用户密码" :label-width="formLabelWidth">
                    <el-input v-model="form.data.password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model.number="form.data.age" autocomplete="off" :readonly="viewModule" />
                </el-form-item>
                <el-form-item v-if="viewModule" label="注册时间" :label-width="formLabelWidth">
                    <el-input v-model="form.data.date" autocomplete="off" readonly />
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.data.email" autocomplete="off" :readonly="viewModule"  />
                </el-form-item>
                <el-form-item label="用户电话" :label-width="formLabelWidth">
                    <el-input v-model="form.data.phone" autocomplete="off" :readonly="viewModule" />
                </el-form-item>
                <el-form-item label="用户授权状态" :label-width="formLabelWidth">
                    <div class="mb-2 flex items-center text-sm">
                        <el-radio-group v-model="form.data.status" class="ml-4" :disabled="viewModule" >
                            <el-radio :label='0' size="large">不授权</el-radio>
                            <el-radio :label='1' size="large">授权</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" v-if="!viewModule">
                <el-button type="warning" @click="dialogFormVisible = false">取消</el-button>
                <el-button type="success" @click="submit">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { editorUser } from '@/api/user';
import { ElMessage } from 'element-plus';
const formLabelWidth = '140px';
let editorModule = ref(true);
let viewModule = ref(false);
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
        date: null,
    }
});
onMounted(() => {

})
let title = ref("");
const add = () => {
    dialogFormVisible.value = true;
    editorModule.value = false;
    form.data = {
        id: null,
        name: null,
        password: null,
        age: null,
        email: null,
        phone: null,
        status: 0,
        date :null
    };
}
const editor = (item: any) => {
    dialogFormVisible.value = true;
    editorModule.value = true;
    form.data = JSON.parse(JSON.stringify(item));
    form.data.password = null;
}
const view = (item: any) => {
    dialogFormVisible.value = true;
    viewModule.value = true;
    form.data = item;
    form.data.date = props.currentDateFormat(form.data.date);
}

const submit = async () => {
    if (!editorModule.value) {
        console.log("add");
        console.log(form.data);
    } else {
        console.log("editor");
        console.log(form.data);
        const result: any = await editorUser({ ...form.data, status: form.data.status + '' });
        console.log(result);
        if (result.code == 1001) {
            dialogFormVisible.value = false;
            props.refreshData();
            ElMessage({
                type: 'success',
                message: '已成功编辑',
                duration:1000
            })
        } else {
            ElMessage({
                type: 'error',
                message: result.message,
            })
        }
    }
}
const handleClose = ()=>{
    dialogFormVisible.value = false;
    if(viewModule){
        viewModule.value=!viewModule.value;
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
defineExpose({ add, editor,view });
const props = defineProps<{
    currentDateFormat: Function,
    refreshData: Function
}>(

);
</script>

<style lang="scss" scoped>
.dialog-footer {
    padding: 5px;
}
</style>