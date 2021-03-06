// Global

const HOME = '/'
const JOIN = '/join'
const LOGIN = '/login'
const LOGOUT = '/logout'
const SEARCH = '/search'

/* routes.js */

// Users
const USERS = '/users'
const USERS_DETAIL = '/:id'
const EDIT_PROFILE = '/edit-profile'
const CHANGE_PASSWORD = '/change-password'

// Videos
const VIDEOS = '/videos'
const UPLOAD = '/upload'
const VIDEO_DETAIL = '/:id'
const EDIT_VIDEO = '/:id/edit'
const DELETE_VIDEO = '/:id/delete'

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id: any) => {
    if (id) {
      return `/users/${id}`
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: VIDEO_DETAIL,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
}

export default routes
