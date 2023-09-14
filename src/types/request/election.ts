interface SelectListReq {
    title: string
    category: number
    page: number
    size: number

}
type PartialSelectListReq=Partial<SelectListReq>
export {
    PartialSelectListReq
}
