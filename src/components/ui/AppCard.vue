<template>
    <div :class="width">
        <div class="card">
            <h4 class="card-header mt-0" v-if="header">{{ header }}</h4>
            <div class="card-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        width: {
            type: String,
        },
        header: {
            type: String,
        },
    },
    setup() {
        return {};
    },
});
</script>

<style scoped></style>
