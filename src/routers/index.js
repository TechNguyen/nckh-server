import AuthRouter from "./auth.router.js"
function Route(app) {
    app.use('/api/v1', AuthRouter)
}
export default Route