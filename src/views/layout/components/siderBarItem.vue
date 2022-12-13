<template>
    <div class="menu-wrapper">
        <el-menu-item :index="item.path" :key="item.path" :disabled="item.disabled">
            <svg class="icon svg-icon" aria-hidden="true">
                <use :xlink:href="'#' + item.icon" />
            </svg>
            <slot name="title">{{ item.title }}</slot>
        </el-menu-item>
    </div>
</template>
<script lang="ts" setup>
import { defineComponent } from 'vue'
defineProps<{
    item:any
}>();

</script>

<style scoped>

</style>