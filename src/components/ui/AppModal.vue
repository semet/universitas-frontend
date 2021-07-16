<template>
    <div
        id="myModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mt-0" id="myModalLabel">{{ heading }}</h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                    >
                        ×
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary waves-effect"
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary waves-effect waves-light"
                        v-if="event"
                        @click.prevent="saveData"
                    >
                        Save Data
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</template>

<script lang="ts">
import { Emitter } from "mitt";
import { defineComponent, inject } from "vue";

export default defineComponent({
    props: {
        heading: {
            type: String,
        },
        event: {
            type: String,
            required: false,
        },
    },
    setup(props) {
        const event = inject("eventBus") as Emitter<any>;
        const saveData = () => {
            event.emit(props.event!);
            console.log(props.event);
        };
        return {
            saveData,
        };
    },
});
</script>

<style scoped></style>
