import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import PlantDetect from './views/nav2/PlantDetect.vue'
import AdvancedGeneral from './views/nav2/AdvancedGeneral.vue'
import AnimalDetect from './views/nav2/AnimalDetect.vue'
import CarDetect from './views/nav2/CarDetect.vue'
import DishDetect from './views/nav2/DishDetect.vue'
import Page6 from './views/nav3/Page6.vue'
import userInfo from './views/userInfo/User.vue'
import article from './views/article/Article.vue'
import articleDetail from './views/article/articleDetail.vue'
import {checkRole,ROLE_ENUM} from './api/permission'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '网关信息',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
           // { path: '/table', component: Table, name: '信息修改',hidden: checkRole(ROLE_ENUM.SYS.ADMIN)},
            { path: '/form', component: Form, name: 'Form',hidden: checkRole(ROLE_ENUM.SYS.ADMIN)},
            { path: '/user', component: user, name: '信息展示以及查询' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '图像识别模块',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/advancedGeneral', component: AdvancedGeneral, name: '通用物体识别页面' },
            { path: '/plantDetect', component: PlantDetect, name: '植物识别页面' },
            { path: '/animalDetect', component: AnimalDetect, name: '动物识别页面' },
            { path: '/carDetect', component: CarDetect, name: '车辆识别页面' },
            { path: '/dishDetect', component: DishDetect, name: '菜品识别页面' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/about', component: Page6, name: '关于我们模块'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            //,hidden: !checkRole(ROLE_ENUM.SYS.ADMIN)
            { path: '/userinfo', component: userInfo, name: '人员管理模块',hidden: !checkRole(ROLE_ENUM.SYS.ADMIN)}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/article', component: article, name: '文章模块'},
            { path: '/articleDetail', component: articleDetail, name: '文章详情模块'}
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;