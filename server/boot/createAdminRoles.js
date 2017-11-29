function generatePassword() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = (app) => {
  if (!app) return new Promise.reject(new Error('App is not defined'));

  let Role = app.models.Role;
  let User = app.models.User;
  let RoleMapping = app.models.RoleMapping;

  // Create admin role
  return Role.findOrCreate({name: 'admin'})
  .then((role) =>  {
    console.log("> Roles Created succesfully");
    let pass = generatePassword();
    let email = "admin@admin.com";
    return User.find({where: {username: 'admin'}})
    .then((data) => {
      if(data._id) console.log('> User "admin" already created');
      if(!data._id) console.log(`> User "admin" with email ${email} will be created. Password: ${pass}`);
      return User.findOrCreate({where: {username: 'admin'}},
      {
        username: 'admin',
        email: email,
        password: pass,
        emailVerified: true
      });
    })
    .then((user) => {
      return {role: role[0], user: user[0]};
    });
  })
  .then((data) => {
    return RoleMapping.findOrCreate({principalType: RoleMapping.USER, principalId: data.user.id, roleId: data.role.id});
  })
  .then()
  .catch(err => console.log(`ROLES ERROR: ${err}`));
};
