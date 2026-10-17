import './Inventory.css';
import { Link } from 'react-router'
import { useState, useEffect } from 'react';
import axios, { type AxiosError } from 'axios';
// import data from '../data.json';
// import data from "../useAxios"

interface Post {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    product_status: string;
}

export default function Inventory() {


    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:1122/stock");
                if (Array.isArray(response.data) && response.data[0]) {
                    setData(response.data[0]);
                }
                setError(null);
            } catch (err) {
                const error = err as AxiosError;
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="inv">Loading inventory...</div>;
    if (error) return <div className="inv">Error: {error}</div>;

    const products = data.length;
    let inside = 0;
    let outside = 0;


    data.forEach((pro) => {
        if (pro.product_status === 'inside') inside++;
        if (pro.product_status === 'outside') outside++;
    });

    return (
        <div className="inv">
            <div className="inv-left">
                <h1 className="inv-title">Inventory</h1>

                <p className="inv-text">
                    Manage your products, prices, and stock in one place.
                </p>

                <div className="prdects-number">
                    <p className="product-num">
                        {products} products
                    </p>

                    <p className="in">
                        <span id="green"></span>
                        {inside} in stock
                    </p>

                    <p className="out">
                        <span id="red"></span>
                        {outside} out stock
                    </p>
                </div>
            </div>

            <div className="inv-right">
                <Link to='/add'>
                    <button className="inv-but">
                        + add product
                    </button>
                </Link>

            </div>
        </div>
    );
}