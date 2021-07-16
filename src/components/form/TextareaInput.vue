<template>
    <div class="input-group mb-3">
        <textarea
            class="form-control"
            rows="5"
            :placeholder="placeholder"
            :value="modelValue"
            @input="updateValue($event.target.value)"
        ></textarea>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        placeholder: {
            type: String,
        },
        modelValue: {
            type: String,
        },
    },
    setup(props, { emit }) {
        const updateValue = (e: string) => {
            emit("update:modelValue", e);
        };

        return {
            updateValue,
        };
    },
});
</script>

<style scoped></style>
