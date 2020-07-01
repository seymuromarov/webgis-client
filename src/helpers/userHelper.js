const functions = {
  mapRoleObj(roles) {
    let obj = roles.map((role) => {
      let name = role.name.toLowerCase();
      let permissions = [];
      if (role.permissions && role.permissions.length > 0)
        permissions = role.permissions.map((item) => {
          return `${item.category.label}_${item.permission.label}`.toLowerCase();
        });
      return { name, permissions };
    });
    return obj;
  },
  mapPermissionObj(permissions) {
    if (permissions && permissions.length > 0)
      return permissions.map((item) => {
        return item.label.toLowerCase();
      });
    else return [];
  },
  mapUserInfo(data) {
    const { userName, email, id } = data;
    return { userName, email, id };
  },
};
export default { ...functions };
