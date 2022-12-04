const msg = (email, name, key) => {
  return {
    to: email,
    subject: "Activation key. Slim Mom App",
    html: `<h1>Hello, ${name}! You forgot password and want to save new password</h1> 
        <p>Activation key: ${key}</p>
        <p>Please copy activation key and enter in Slim Mom App</p>`,
  };
};

module.exports = msg;
