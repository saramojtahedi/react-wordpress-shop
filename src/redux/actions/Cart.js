import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
    url: "http://simamojtahedi.ir/cj",
    consumerKey: "ck_09ce04734fa1d608ca71c77fb24158484c3d20f1",
    consumerSecret: "cs_39f6bc975e7cceda69c0bf9623735ed847472d1f",
    version: "wc/v3"
});

export const addToCart = (id) => async (dispatch, getState) => {
    const {data} = await api.get(`products/${id}`)

    dispatch({
        type: "CART_ADD_ITEM",
        payload: {
            product: data.id,
            name: data.name,
            price: data.price,
            image: data.images[0],
        }
    })

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: "CART_REMOVE_ITEM",
        payload: id
    })

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))

}