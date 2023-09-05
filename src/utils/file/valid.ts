/**
 * 校验文件后缀是否合格
 * @param extension
 */
const createValidateFileExtension = (extension:string[] = []) => (filename:string) => {
    // @ts-ignore
    const fileExt = filename.split('.').pop().toLowerCase();
    return extension.map((item) => item.toLowerCase()).includes(fileExt);
};
/**
 * 常见的图片类型
 */
const ImageTypes = ['jpg', 'jpeg', 'png', 'gif', 'tif', 'webp', 'svg', 'ico'];
const isOverSize = (fileSize:number, limitSize:number) => {
    const fileSizeInMB = fileSize / (1024 * 1024); // 将字节转换为兆字节
    return fileSizeInMB > limitSize;
};
export { createValidateFileExtension, ImageTypes, isOverSize };
