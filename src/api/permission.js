/**
 * 校验权限，拥有权限返回true
 * @param target 要校验是否存在的权限，若为一个对象，其中一个属性匹配成功即返回ture
 */
export function checkRole(target) {
    var roleList = JSON.parse(localStorage.getItem('user')).role;
    console.log('2',roleList)
    console.log('2',checkRoleInList(target,roleList))
    return checkRoleInList(target,roleList);
}

/**
 * 校验权限，拥有权限返回true
 * @param target 要校验是否存在的权限，若为一个对象，其中一个属性匹配成功即返回ture
 * @param permissionList 权限列表
 */
export function checkRoleInList(target, roleList) {
    for (var role of roleList) {
        if (typeof(target) === 'string'){
            if (role === target) {
                return true;
            }
        }
    }
    return false;
}

export var ROLE_ENUM = {
    SYS: {
        ADMIN: "admin"
    }
};
