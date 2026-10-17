import './Delete.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:1122/stock';

// The problem i : the delete working but you must do refresh to see the changes in the list. I want to make it so that when you delete a product, it automatically updates the list without needing to refresh the page.
// next time you must fix this problem

interface DeleteProps {
    hide: boolean;
    proId: number;
    onClose: () => void;
}

type ProductStatus = 'inside' | 'outside';

interface Product {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    product_status: ProductStatus;
}

export default function Delete({ hide, proId, onClose }: DeleteProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Don't fetch when hidden or no id
        if (hide || !proId) return;

        let cancelled = false; // avoids setting state after unmount / id change

        async function loadProduct() {
            setLoading(true);
            setProduct(null);
            setMessage('');

            try {
                const response = await axios.get<Product>(`${API_URL}/${proId}`);
                if (!cancelled) setProduct(response.data);
            } catch {
                if (!cancelled) setMessage('Failed to load product.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        void loadProduct();

        return () => {
            cancelled = true;
        };
    }, [proId, hide]);

    async function deleteProduct() {
        setDeleting(true);
        setMessage('');

        try {
            await axios.delete(`${API_URL}/${proId}`);
            onClose();
        } catch {
            setMessage('Failed to delete product.');
        } finally {
            setDeleting(false);
        }
    }

    if (hide) return null;

    return (
        <div className="delete-overlay">
            <div className="delete-dialog">

                <div className="delete-icon-box">
                    <span className="delete-dialog-icon"></span>
                </div>

                <div className="delete-content">
                    <h2 className="delete-title">Delete product?</h2>

                    {loading ? (
                        <p className="delete-message">Loading...</p>
                    ) : (
                        <p className="delete-message">
                            Remove <strong>{product?.name}</strong> {product?.sku} from your inventory?
                            <br />
                            This action cannot be undone.
                        </p>
                    )}

                    {message && <p className="delete-error">{message}</p>}
                </div>

                <div className="delete-actions">
                    <button
                        type="button"
                        className="cancel-delete"
                        onClick={onClose}
                        disabled={deleting}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="confirm-delete"
                        onClick={deleteProduct}
                        disabled={loading || deleting || !product}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>

            </div>
        </div>
    );
}