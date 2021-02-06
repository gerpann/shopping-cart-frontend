import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListProducts} from './productSlice';
import './ProductList.css';
import qs from 'qs';
import Product from './Product'

const ProductList = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        let params = qs.parse(props.location.search, {ignoreQueryPrefix: true});
        dispatch(fetchListProducts({pageNumber: params?.page, sortType: params?.sort}));
    }, [dispatch, props.location.search]);

    const productsList = useSelector(state => state.productSlice.products);
    const isPendingProducts = useSelector(state => state.productSlice.isPendingProducts);

    return (
        <React.Fragment>
            <section className='product-list'>
                <div className='container'>
                    <div className='row'>
                        <div className='widget-title'>
                            <div className='col'>
                                <h3>
                                    <span>All products</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {
                            !isPendingProducts && productsList.length &&
                            productsList.map((product, index) =>
                                <Product
                                    key={index}
                                    props={props}
                                    id={product._id}
                                    name={product.name}
                                    productImage={product.productImage}
                                    price={product.price}
                                    salePrice={product.salePrice}
                                    description={product.description}
                                />
                            )
                        }
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ProductList;