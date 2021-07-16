import { Ref } from "vue";

declare type ModalProps<T> = {
    heading: Ref<string> | string;
    content?: Ref<string> | string;
    event?: keyof T;
};
