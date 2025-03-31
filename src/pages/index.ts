import * as Home from './Home'
import * as Login from './Login'
import * as Register from './Register'
import * as Dashboards from './dashboard/index'
import * as About from './About'
import * as ForgotPassword from './ForgotPassword'
import * as ResetPassword from './ResetPassword'

export const Pages = {
    ...Home,
    ...Login,
    ...Register,
    ...Dashboards,
    ...About,
    ...ForgotPassword,
    ...ResetPassword
}