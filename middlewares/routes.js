const userRouter = require('../routers/userRouter');
const categoryRouter = require('../routers/categoryRouter');
const productRouter = require('../routers/productRouter');
const cartRouter = require('../routers/cartRouter');
const profileRouter = require('../routers/profileRouter');
const paymentRouter = require('../routers/paymentRouter');
const authGoogleRouter = require('../routers/authGoogleRouter');
const allProductRouter = require('../routers/allProductRouter');
const reviewRouter = require('../routers/reviewRouter');


module.exports = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api/payment', paymentRouter);
    app.use('/auth/google', authGoogleRouter);
    app.use('/api/allProduct', allProductRouter);
    app.use('/api/review', reviewRouter);

}