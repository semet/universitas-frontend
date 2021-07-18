<template>
    <select class="custom-select">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        data: {
            type: Array,
        },
    },
    setup() {
        return {};
    },
});
</script>

<style scoped></style>
