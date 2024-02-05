import AuthRouter from "./auth.router.js"
import RoleRouter from "./role.router.js"
function Route(app) {
    app.use('/api/v1/auth', AuthRouter)
    app.use('/api/v1/role', RoleRouter)
}
export default Route