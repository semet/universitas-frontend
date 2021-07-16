<template>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" :id="inputId">
                <i :class="icon"></i>
            </span>
        </div>
        <input
            type="text"
            class="form-control"
            :placeholder="placeholder"
            :aria-label="placeholder"
            :aria-describedby="inputId"
            :value="modelValue"
            @input="updateValue($event.target.value)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        inputId: {
            type: String,
        },
        icon: {
            type: String,
        },
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
