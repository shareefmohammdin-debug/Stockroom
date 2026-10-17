import './Show.css';
import { Link } from 'react-router'
// import data from '../data.json';
import { Delete } from '../index'
import { useState, useEffect } from 'react';
import axios, {type AxiosError} from 'axios';

interface Post {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    product_status: string;
}

export default function Show() {


    const [hideSwitch, setHideSwitch] = useState<boolean>(true)
    const [productId, setProductId] = useState<number>(0)

    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("http://localhost:1122/stock")
                setData(data.data[0])
                setError(null)

                // console.log(data.data)

            } catch (err) {
                const error = err as AxiosError
                setError(error.message)

            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="continer">

            {/* Search box */}
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by product name or SKU"
                />
            </div>

            {/* First row in the table */}
            <div className="first-row">
                <div className="first-row-items">Product</div>
                <div className="first-row-items">SKU</div>
                <div className="first-row-items">Quantity</div>
                <div className="first-row-items">Unit price</div>
                <div className="first-row-items">Stock status</div>
                <div className="first-row-items">Actions</div>
            </div>

            {/* Show all products */}
            <div className="show-all">
                {data.map((pro) => {
                    return (
                        <div className="dis-product" key={pro.id}>

                            <div className="dis-name">
                                {pro.name}
                            </div>

                            <div className="dis-sku">
                                {pro.sku}
                            </div>

                            <div className="dis-quantity">
                                {pro.quantity}
                            </div>

                            <div className="dis-price">
                                ${pro.price}
                            </div>

                            <div className={`dis-status ${pro.product_status}`}>
                                {pro.product_status}
                            </div>

                            <div className="dis-action">
                                <Link className='custom-link' to={`/edit/${pro.id}`}>
                                    <button
                                        type="button"
                                        className="edit-but"
                                    >
                                        <span className="edit-icon"></span>
                                        Edit
                                    </button>
                                </Link>

                                {/* <Link className='custom-link' to='/delete'> */}
                                <button
                                    type="button"
                                    className="delete-but"
                                    onClick={() => { setHideSwitch(false); setProductId(pro.id) }}
                                >
                                    <span className="delete-icon" ></span>
                                    Delete
                                </button>
                                {/* </Link> */}
                            </div>

                        </div>
                    );
                })}

                {/* the show foot */}
                <div className="show-foot">
                    <p className='show-foot-p'>Showing all {data.length} products</p>
                </div>
            </div>

            <Delete hide={hideSwitch} proId={productId} onClose={() => setHideSwitch(true)} />

        </div>
    );
}
