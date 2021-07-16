<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
    setup() {
        onMounted(() => {});

        return {};
    },
});
</script>

<style scoped></style>
