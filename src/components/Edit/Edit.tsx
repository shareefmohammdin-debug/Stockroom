import './Edit.css'
import { Link } from 'react-router'

export default function Edit() {
    return (
        <div className="add-product">

            <form action="add-name" onSubmit={(e) => { e.preventDefault() }} className="add-form">
                <div className="addtitle-div">
                    <h1 className="add-title">edit product</h1>
                    <p className="add-p">Update the product details below.</p>
                </div>

                <div className="add-name-div">
                    <label htmlFor="add-name" className="add-label">Product name</label>
                    <input type="text" id="add-name" className="add-input" placeholder='e.g. Wireless Mouse' />
                </div>

                <div className="add-sku-div">
                    <label htmlFor="add-sku" className="add-label">SKU</label>
                    <input type="text" id="add-sku" className="add-input" placeholder='e.g. ACC-009' />
                </div>

                <div className="add-quantity-price-div">
                    <div className="add-quantity-div">
                        <label htmlFor="add-quantity" className="add-label">Quantity</label>
                        <input type="text" id="add-quantity" className="add-input" placeholder='0' />
                    </div>
                    <div className="add-price-div">
                        <label htmlFor="add-price" className="add-label">Unit price (USD)</label>
                        <input type="text" id="add-price" className="add-input" placeholder='0.00' />
                    </div>

                </div>


                <div className="slock-status">

                    <p className='add-slock'>Slock status</p>

                    <div className="status-div">
                        <button id="add-inside add-active">inside</button>
                        <button id="add-outstde">outside</button>
                    </div>

                </div>

                <p className="add-p">All fields are required. Use a unique SKU for each product.</p>

                <div className="add-submit">
                    <Link to='/' className='custom-link'>
                        <button id="edit-cancel">Cancel</button>
                    </Link>
                    <Link to='/' className='custom-link'>
                        <button id="edit-submit">Save changes</button>
                    </Link>
                </div>

            </form>



        </div>
    )
}