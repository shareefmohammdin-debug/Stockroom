import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import './Add.css';

const API_URL = 'http://localhost:1122/stock';

type StockStatus = 'inside' | 'outside';

export default function Add() {

    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState<StockStatus>('inside');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('error');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage('');

        const parsedQuantity = Number(quantity);
        const parsedPrice = Number(price);

        if (!name.trim() || !sku.trim() || quantity.trim() === '' || price.trim() === '') {
            setMessageType('error');
            setMessage('Please fill in all fields.');
            return;
        }

        if (!Number.isFinite(parsedQuantity) || parsedQuantity < 0 || !Number.isInteger(parsedQuantity)) {
            setMessageType('error');
            setMessage('Quantity must be a whole number greater than or equal to 0.');
            return;
        }

        if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
            setMessageType('error');
            setMessage('Unit price must be a number greater than or equal to 0.');
            return;
        }

        const product = {
            name: name.trim(),
            sku: sku.trim(),
            quantity: parsedQuantity,
            price: parsedPrice,
            product_status: status,
        };

        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            const responseText = await response.text();
            let responseData: unknown = null;
            if (responseText) {
                try {
                    responseData = JSON.parse(responseText);
                } catch {
                    responseData = responseText;
                }
            }

            if (!response.ok) {
                const serverMessage =
                    typeof responseData === 'object' && responseData !== null && 'message' in responseData
                        ? String((responseData as { message: unknown }).message)
                        : `Server returned ${response.status} ${response.statusText}`;
                throw new Error(serverMessage);
            }

            setMessageType('success');
            setMessage('Product added successfully.');
            setName('');
            setSku('');
            setQuantity('');
            setPrice('');
            setStatus('inside');

            // Give the user a moment to see the success message, then return to the inventory.
            window.setTimeout(() => {
                window.location.assign('/');
            }, 700);
        } catch (error) {
            setMessageType('error');
            setMessage(
                error instanceof TypeError
                    ? 'Could not connect to the backend. Check that the server is running and allows requests from this frontend.'
                    : error instanceof Error
                      ? error.message
                      : 'Something went wrong while adding the product.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="add-product">
            <form onSubmit={handleSubmit} className="add-form">
                <div className="addtitle-div">
                    <h1 className="add-title">Add product</h1>
                    <p className="add-p">Enter the details for your new product.</p>
                </div>

                <div className="add-name-div">
                    <label htmlFor="add-name" className="add-label">Product name</label>
                    <input
                        type="text"
                        id="add-name"
                        className="add-input"
                        placeholder="e.g. Wireless Mouse"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="add-sku-div">
                    <label htmlFor="add-sku" className="add-label">SKU</label>
                    <input
                        type="text"
                        id="add-sku"
                        className="add-input"
                        placeholder="e.g. ACC-009"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        required
                    />
                </div>

                <div className="add-quantity-price-div">
                    <div className="add-quantity-div">
                        <label htmlFor="add-quantity" className="add-label">Quantity</label>
                        <input
                            type="number"
                            id="add-quantity"
                            className="add-input"
                            placeholder="0"
                            min="0"
                            step="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-price-div">
                        <label htmlFor="add-price" className="add-label">Unit price (USD)</label>
                        <input
                            type="number"
                            id="add-price"
                            className="add-input"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="slock-status">
                    <p className="add-slock">Stock status</p>
                    <div className="status-div">
                        <button
                            type="button"
                            className={status === 'inside' ? 'add-active' : ''}
                            aria-pressed={status === 'inside'}
                            onClick={() => setStatus('inside')}
                        >
                            Inside
                        </button>
                        <button
                            type="button"
                            className={status === 'outside' ? 'add-active' : ''}
                            aria-pressed={status === 'outside'}
                            onClick={() => setStatus('outside')}
                        >
                            Outside
                        </button>
                    </div>
                </div>

                {message && (
                    <p className={`add-message ${messageType}`} role="status">
                        {message}
                    </p>
                )}

                <p className="add-p">All fields are required. Use a unique SKU for each product.</p>

                <div className="add-submit">
                    <Link to="/" className="custom-link">
                        <button id="add-cancel" type="button" disabled={loading}>Cancel</button>
                    </Link>
                    <button id="ad-submit" type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
