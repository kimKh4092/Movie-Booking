import PocketBase from "pocketbase";

const pb = new PocketBase("http://212.129.63.142:8090");

export async function createUser(user) {
  const data = {
    username: user.username,
    email: user.email,
    emailVisibility: true,
    password: user.password,
    passwordConfirm: user.password,
  };

  try {
    const record = await pb.collection("users").create(data);
    return record;
  } catch (error) {}
}
