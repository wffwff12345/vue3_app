<template>
    <div class="search">
        <el-input v-model="name" placeholder="请输入用户名" :prefix-icon="Search" @change="changeParam(name)" @input="changeParam(name)"
            @clear="clear" clearable/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'


interface Props {
    changeParam: Function
}
defineProps<Props>()
let name = ref("")
const clear = () => {
    name.value = "";
}
</script>

<style lang="scss" scoped>
.search {
    width: 200px;
    margin-left: 5px;
    margin-bottom: 20px;
}
</style>
