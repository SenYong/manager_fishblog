import fetch from '../config/fetch';

/*
* 验证码
*/
export const verifyImg = () => fetch('s=Admin/index/checkVerify');

/*
* 登陆
* */
export const login = data => fetch('s=Admin/Login/doLogin', data, 'post');

/*
 * 首页发表区的数量
*/
export const publishNum = () => fetch('s=Admin/Index/publishNum', {}, 'post');

/*
* 获取文章栏目
*/
export const artCat = () => fetch('s=Admin/Cat/getCat', {}, 'post');

/*
* 图片上传
*/
export const imgUpload = data => fetch('s=Admin/Article/uploadImg', data, 'post');