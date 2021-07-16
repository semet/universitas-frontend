import $ from "jquery";
import "metismenu";
import SimpleBar from "simplebar";

export const useSidebar = () => {
    const initMetismenu = (element: string) => {
        $(element).metisMenu();
    };

    const initSimpleBar = (element: string) => {
        new SimpleBar($(element)[0]);
    };

    const toggleSidebar = () => {
        $("body").toggleClass("sidebar-enable");
        if ($(window).width()! >= 992) {
            $("body").toggleClass("vertical-collpsed");
        } else {
            $("body").removeClass("vertical-collpsed");
        }
    };

    return {
        initMetismenu,
        initSimpleBar,
        toggleSidebar,
    };
};
