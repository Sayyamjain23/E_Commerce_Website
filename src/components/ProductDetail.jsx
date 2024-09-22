import React, { useState } from 'react';
import { useParams } from 'react-router';
import DATA from '../Data';
import { useDispatch } from 'react-redux';
import { addItem, delItem } from '../redux/actions/index';

const ProductDetail = () => {
    const [cartBtn, setCartBtn] = useState("Add to Cart");
    const [quantity, setQuantity] = useState(1); // Quantity state
    const dispatch = useDispatch();

    // Get the product ID from the URL params
    const proid = useParams();
    const proDetail = DATA.filter(x => x.id == proid.id);
    const product = proDetail[0];
    console.log(product);

    // Function to handle the quantity change
    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value)); // Parse the value to an integer
    };

    // Function to handle Add to Cart and Remove from Cart
    const handleCart = () => {
        const updatedProduct = { ...product, quantity }; // Include quantity
        if (cartBtn === "Add to Cart") {
            dispatch(addItem(updatedProduct)); // Pass quantity when adding the item
            setCartBtn("Remove from Cart");
        } else {
            dispatch(delItem(product)); // Remove item from cart
            setCartBtn("Add to Cart");
        }
    };

    return (
        <div className="container my-5 py-3">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center mx-auto product">
                    <img src={product.img} alt={product.title} height="400px" />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h1 className="display-5 fw-bold">{product.title}</h1>
                    <hr />
                    <h2 className="my-4">${product.price}</h2>
                    <p className="lead">{product.desc}</p>

                    {/* Quantity input field */}
                    <div className="d-flex align-items-center mb-3">
                        <label className="me-2">Quantity:</label>
                        <input type="number" value={quantity} min="1" onChange={handleQuantityChange} />
                    </div>

                    {/* Add to Cart / Remove from Cart button */}
                    <button onClick={handleCart} className="btn btn-outline-primary my-5">
                        {cartBtn}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
