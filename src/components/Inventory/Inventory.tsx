import './Inventory.css';
import { Link } from 'react-router'
import data from '../data.json';

export default function Inventory() {

    const products = data.length;
    let inside = 0;
    let outside = 0;

    data.forEach((pro) => {
        if (pro.status === 'inside') inside++;
        if (pro.status === 'outside') outside++;
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