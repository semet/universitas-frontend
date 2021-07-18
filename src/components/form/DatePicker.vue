<template>
    <div class="input-group mb-3">
        <div class="input-group">
            <input
                class="form-control"
                type="date"
                :value="modelValue"
                @input="updateValue($event.target.value)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
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
