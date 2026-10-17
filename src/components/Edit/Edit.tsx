import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router';
import '../Add/Add.css';

const API_URL = 'http://localhost:1122/stock';

type ProductStatus = 'inside' | 'outside';

interface Product {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    product_status: ProductStatus;
}

export default function Edit() {
    const { id } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Load the product using the ID from the URL.
    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await axios.get<Product>(
                    `${API_URL}/${id}`
                );

                setProduct(response.data);
            } catch {
                setMessage('Failed to load product.');
            }
        }

        if (id) {
            void loadProduct();
        }
    }, [id]);

    // Update one field without changing the others.
    function handleChange(
        field: keyof Product,
        value: string | number
    ) {
        if (!product) return;

        setProduct({
            ...product,
            [field]: value,
        });
    }

    // Save the edited product.
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!product || !id) return;

        setLoading(true);
        setMessage('');

        try {
            await axios.put(`${API_URL}/${id}`, {
                name: product.name,
                sku: product.sku,
                quantity: Number(product.quantity),
                price: Number(product.price),
                product_status: product.product_status,
            });

            setMessage('Product updated successfully.');
        } catch {
            setMessage('Failed to update product.');
        } finally {
            setLoading(false);
        }
    }

    if (!product) {
        return (
            <div className="add-product">
                <p>{message || 'Loading product...'}</p>
            </div>
        );
    }

    return (
        <div className="add-product">
            <form onSubmit={handleSubmit} className="add-form">

                <div className="addtitle-div">
                    <h1 className="add-title">Edit product</h1>
                    <p className="add-p">
                        Update the product details below.
                    </p>
                </div>

                <div className="add-name-div">
                    <label htmlFor="edit-name" className="add-label">
                        Product name
                    </label>

                    <input
                        id="edit-name"
                        className="add-input"
                        type="text"
                        value={product.name}
                        onChange={(e) =>
                            handleChange('name', e.target.value)
                        }
                        required
                    />
                </div>

                <div className="add-sku-div">
                    <label htmlFor="edit-sku" className="add-label">
                        SKU
                    </label>

                    <input
                        id="edit-sku"
                        className="add-input"
                        type="text"
                        value={product.sku}
                        onChange={(e) =>
                            handleChange('sku', e.target.value)
                        }
                        required
                    />
                </div>

                <div className="add-quantity-price-div">
                    <div className="add-quantity-div">
                        <label
                            htmlFor="edit-quantity"
                            className="add-label"
                        >
                            Quantity
                        </label>

                        <input
                            id="edit-quantity"
                            className="add-input"
                            type="number"
                            min="0"
                            step="1"
                            value={product.quantity}
                            onChange={(e) =>
                                handleChange(
                                    'quantity',
                                    Number(e.target.value)
                                )
                            }
                            required
                        />
                    </div>

                    <div className="add-price-div">
                        <label
                            htmlFor="edit-price"
                            className="add-label"
                        >
                            Unit price (USD)
                        </label>

                        <input
                            id="edit-price"
                            className="add-input"
                            type="number"
                            min="0"
                            step="0.01"
                            value={product.price}
                            onChange={(e) =>
                                handleChange(
                                    'price',
                                    Number(e.target.value)
                                )
                            }
                            required
                        />
                    </div>
                </div>

                <div className="slock-status">
                    <p className="add-slock">Stock status</p>

                    <div className="status-div">
                        <button
                            type="button"
                            className={
                                product.product_status === 'inside'
                                    ? 'add-active'
                                    : ''
                            }
                            onClick={() =>
                                handleChange('product_status', 'inside')
                            }
                        >
                            Inside
                        </button>

                        <button
                            type="button"
                            className={
                                product.product_status === 'outside'
                                    ? 'add-active'
                                    : ''
                            }
                            onClick={() =>
                                handleChange('product_status', 'outside')
                            }
                        >
                            Outside
                        </button>
                    </div>
                </div>

                {message && (
                    <p className="add-p" role="status">
                        {message}
                    </p>
                )}

                <div className="add-submit">
                    <Link to="/" className="custom-link">
                        <button id="edit-cancel" type="button">
                            Back
                        </button>
                    </Link>

                    {/* <Link to="/" className="custom-link"> */}
                        <button
                            id="edit-submit"
                            type="submit"
                            disabled={loading}

                        >
                            {loading ? 'Saving...' : 'Save changes'}
                        </button>
                    {/* </Link> */}
                </div>

            </form>
        </div>
    );
}
