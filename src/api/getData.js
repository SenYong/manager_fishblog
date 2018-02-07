import fetch from '../config/fetch';

/*
* 验证码
*/
export const verifyImg = () => fetch('s=Admin/Login/verify', {}, 'get');

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
* 文章图片上传
*/
export const imgUpload = data => fetch('s=Admin/Article/uploadImg', data, 'post');

/*
* 新增文章
*/
export const  addArt = data => fetch('s=Admin/Article/addArticle', data, 'post');

/*
* 获取所有文章
*/
export const getArt = data => fetch('s=Admin/Article/selectArticle', data, 'post');

/*
 * 删除文章
 */
export const delArt = data => fetch('s=Admin/Article/delArticle', data, 'post');

/*
* 获取单条文章
 */
export const getOneArt = data => fetch('s=Admin/Article/getOneData', data, 'post');

/*
 * 修改文章 
 */
export const updateArt = data => fetch('s=Admin/Article/updateArticle', data, 'post');

/*
* 说说图片上传
*/
export const sayImgUpload = data => fetch('s=Admin/Say/uploadImg', data, 'post');

/*
 * 新增说说
 */
export const addSay = data => fetch('s=Admin/Say/addSay', data, 'post');

/*
 * 获取所有说说
 */
export const getSay = () => fetch('s=Admin/Say/selectSay', {}, 'post');

/*
 * 获取单条说说
 */
export const getOneSay = data => fetch('s=Admin/Say/getOneSay', data, 'post');

/*
 * 修改说说
 */
export const updateSay = data => fetch('s=Admin/Say/updateSay', data, 'post');

/*
 * 删除说说
 */
export const deleteSay = data => fetch('s=Admin/Say/deleteSay', data, 'post');

/*
 * 新增栏目
 */
export const addCat = data => fetch('s=Admin/Cat/addCat', data, 'post');

/*
 * 获取所有栏目
 */
export const getCat = () => fetch('s=Admin/Cat/selectCat', {}, 'post'); 

/*
 * 获取指定id的栏目 
 */
export const getOneCat = data => fetch('s=Admin/Cat/getOneCat', data, 'post');

/*
 * 删除指定id的栏目 
 */
export const delCat = data => fetch('s=Admin/Cat/deleteCat', data, 'post');

/*
 * 日志图片上传
 */
export const logImgUpload = data => fetch('s=Admin/Log/uploadImg', data, 'post');

/*
 * 新增日志
 */
export const addLog = data => fetch('s=Admin/Log/addLog', data, 'post');

/* 
 * 获取所有日志
 */
export const getLog = () => fetch('s=Admin/Log/selectLog', {}, 'post');

/*
 * 获取单条日志
 */
export const getOneLog = data => fetch('s=Admin/Log/getOneLog', data, 'post');

/*
 * 修改日志 
 */
export const updateLog = data => fetch('s=Admin/Log/updateLog', data, 'post');

/*
 * 删除日志
 */
export const deleteLog = data => fetch('s=Admin/Log/deleteLog', data, 'post');

/*
 * 添加用户
 */
export const addUser = data => fetch('s=Admin/User/addUser', data, 'post');

/*
 * 用户列表
 */
export const UserList = data => fetch('s=Admin/User/selectUser', data, 'post');

/*
 * 获取用户个人信息
 */
export const getUserInfo = data => fetch('s=Admin/User/getOneUser', data, 'post');

/*
 * 用户头像上传
 */
export const userLogoUpload = data => fetch('s=Admin/User/uploadImg', data, 'post');

/*
 * 修改用户个人信息 
 */
export const updateUser = data => fetch('s=Admin/User/updateUser', data, 'post');

/*
 * 删除用户
 */
export const delUser = data => fetch('s=Admin/User/deleteUser', data, 'post');

/*
 * 系统设置图片上传
 */
export const systemImgUpload = data => fetch('s=Admin/System/uploadImg',data, 'post');

/*
 * 添加系统设置
 */
export const addSystem = data => fetch('s=Admin/System/addSystem', data, 'post');

/*
 * 获取系统设置列表
 */
export const getSystemList = () => fetch('s=Admin/System/getSystemList', {}, 'post');

/*
 * 获取系统详情
 */
export const getOneSystem = data => fetch('s=Admin/System/getOneSystem', data, 'post');

/*
 * 修改系统设置
 */
export const updateSystem = data => fetch('s=Admin/System/updateSystem', data, 'post');

/*
 * 删除系统详情
 */
export const delSystem = data => fetch('s=Admin/System/delSystem', data, 'post');