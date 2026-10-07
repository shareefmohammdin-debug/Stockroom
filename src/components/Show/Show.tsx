import './Show.css';
import { Link } from 'react-router'
import data from '../data.json';

export default function Show() {
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
                                ${pro.price.toFixed(2)}
                            </div>

                            <div className={`dis-status ${pro.status}`}>
                                {pro.status}
                            </div>

                            <div className="dis-action">
                                <Link className='custom-link' to='/edit'>
                                    <button
                                        type="button"
                                        className="edit-but"
                                    >
                                        <span className="edit-icon"></span>
                                        Edit
                                    </button>
                                </Link>

                                <Link className='custom-link' to='/delete'>
                                    <button
                                        type="button"
                                        className="delete-but"
                                    >
                                        <span className="delete-icon"></span>
                                        Delete
                                    </button>
                                </Link>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}