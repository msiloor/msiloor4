<template>
    <div @click="toPath(to, value)" :class="select == value ? 'router-link-exact-active' : ''">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    to: string
    value: string
    select: string
    toPath: (to: string, value: string) => void
}>()

</script>