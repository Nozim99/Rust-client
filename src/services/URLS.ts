export const URLS = {
  start: "https://us-central1-rustify-dac51.cloudfunctions.net/app",
  // start: "http://localhost:5000",

  // Auth
  signup: "/login/signup",
  signin: "/login/signin",

  // Door lock
  getNum: "/door-lock/get-num/",
  getGroups: "/door-lock/get-groups",
  getNumInGroup: "/door-lock/group-number/",
  getArchiveCodes: "/door-lock/archive-codes/",
  createGroup: "/door-lock/create-group",
  deleteGroup: "/door-lock/delete-group",
  getGroupMembers: "/door-lock/group-members/",
  addPlayer: "/door-lock/add-player",
  acceptNotification: "/door-lock/accept-notification/",
  getNotifications: "/door-lock/get-notifications",
  deletePlayer: "/door-lock/remove-player",
  getUsers: "/door-lock/get-users",
  status: "/door-lock/status"
}