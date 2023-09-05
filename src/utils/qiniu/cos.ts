import * as qiniu from 'qiniu-js'


const putExtra = {
    mimeType: 'image/png'
}
const config = {
    useCdnDomain: true,
    region: qiniu.region.z2,
    forceDirect: true
}
const useQiniu = (token: string) => {
    const baseUrl = 'http://s0esmj4gx.hn-bkt.clouddn.com/'
    const upload =  (file: File): string=> {
        const observer = {
            next(res: any) {
                console.log(res, 2333)
            },
            error(err: any) {
                console.log(err, 2222)
            },
            complete(res: any) {
                // ...
                console.log(res)
            }
        }
        const observable = qiniu.upload(
            file, file.name, token, putExtra, config
        )
        observable.subscribe(observer) // 上传开始
        return baseUrl + file.name


    }
    return {
        upload
    }

}
export default useQiniu
