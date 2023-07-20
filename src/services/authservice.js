import PocketBase from "pocketbase";

const pb = new PocketBase("http://212.129.63.142:8090");

//get user from api
export async function readUser(user) {
  // authenticate with a user
  try {
    const userData = await pb
      .collection("users")
      .authWithPassword(user.email, user.password);

    return userData;
  } catch (error) {}
}

//get current user
export function getCurrentUser() {
  try {
    return pb.authStore.model.username;
  } catch (error) {}
}

// get user id
export function getCurrentUserID() {
  try {
    return pb.authStore.model.id;
  } catch (error) {}
}

export function logout() {
  pb.authStore.clear();
}
