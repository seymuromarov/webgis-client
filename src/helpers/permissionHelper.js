const checker = {
  getRolePermissions(roles) {
    let permissions = [];
    roles.forEach((role) => {
      permissions = permissions.concat(role.permissions);
    });
    return permissions;
  },
  getRoleNames(roles) {
    return roles.map((c) => c.name);
  },
};
export default { ...checker };
