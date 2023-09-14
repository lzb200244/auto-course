import {computed, reactive, ref} from "vue";
import {Page} from "@/consts/page.ts";

export interface Pager {
    current: number,
    pageSize: number
    total?: number
}

const usePager = (size: number=Page.PageSize) => {
    const Max = ref(0)
    const pagination = reactive<Pager>({
        current: 1,
        pageSize:size ,
        total: 0
    })
    /**
     * 设置以前访问的页数防止进行多次再次请求，
     * @param page
     */
    const setMax = (page: number) => {
        Max.value = Math.max(Max.value, page)
    }
    const pageRange = computed<[number, number]>(() => {
        return [(pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize]
    })
    return {
        Max,
        pagination, pageRange, setMax
    }
}
export default usePager
