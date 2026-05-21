function validateRegister(username,password,users) {
  if (!username||!password) {
    return"fill all the fields to proceed";
  }

  if (users.length>= 5) {
    return "max users reached";
  }

  const exists=users.find(
    user=>user.username===username
  );

  if (exists) {
    return "username is taken";
  }

  return null;
}

module.exports = validateRegister;