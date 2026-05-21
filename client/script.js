const message = document.getElementById("message");

async function registerUser() {
  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  try {
    const response = await fetch(
      "/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    message.innerText = data.message;

  } catch (error) {
    console.error(error);

    message.innerText =
      "Server connection failed";
  }
}

async function loginUser() {
  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  try {
    const response = await fetch(
      "/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    message.innerText = data.message;

  } catch (error) {
    console.error(error);

    message.innerText =
      "Server connection failed";
  }
}