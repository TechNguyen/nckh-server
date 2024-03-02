import AuthRouter from "./auth.router.js"
import RoleRouter from "./role.router.js"
import ProductRouter from "./product.router.js"
import TrademarkRouter from "./trademark.router.js"
import ProfileRouter from "./profile.router.js"
function Route(app) {
    app.use('/api/v1/auth', AuthRouter)
    app.use('/api/v1/role', RoleRouter)
    app.use('/api/v1/product', ProductRouter )
    app.use('/api/v1/trademark',TrademarkRouter  )
    app.use('/api/v1/profile',ProfileRouter  )
}
export default Route