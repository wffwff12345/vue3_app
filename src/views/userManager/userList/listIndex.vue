<template>
    <div class="userWrapper">
        <searchTool :changeParam="changeParam"/>
        <searchResult ref="searchRef" :userList="userList" :total="total" :pageSize="Params.size"
            :currentPage="Params.page" :changePage="changePage" :changeSize="changeSize" />
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import searchResult from './components/searchResult.vue'
import searchTool from './components/searchTool.vue'
import { getUsers } from '@/api/user'
let searchRef = ref();
let Params = reactive({
    page: 1,
    size: 10,
    name: '',
})
let total = ref(0)
let userList: any = reactive([]);
onMounted(async() => {
    getUser();
});
const changeParam = (name: any) => {
    Params.name = name;
    getUser();
}
const getUser = async (): Promise<any> => {
    const result = await getUsers(Params);
    console.log(result);
    total.value = result.total;
    userList.splice(0, userList.length);
    userList.push(...result.data);
    console.log(userList)
}
const changePage = (page: any) => {
    Params.page = page;
    getUser();
}
const changeSize = (size: any) => {
    Params.size = size;
    getUser();
}
const deleteUser = (id: any) => {
    console.log(id)
}
</script>

<style scoped>

</style>