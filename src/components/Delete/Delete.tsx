import './Delete.css';
import data from '../data.json'

interface DeleteProps {
    hide: boolean;
    proId:number;
    onClose: () => void;
}

export default function Delete({ hide, proId, onClose }: DeleteProps) {

  
    function deleteProduct(){
        data.splice(proId, 1)
        onClose()
    }

    if(hide) return null;

    return (
        <div className="delete-overlay">

            <div className="delete-dialog">

                {/* Delete icon */}
                <div className="delete-icon-box">
                    <span className="delete-dialog-icon"></span>
                </div>

                {/* Content */}
                <div className="delete-content">

                    <h2 className="delete-title">
                        Delete product?
                    </h2>

                    <p className="delete-message">
                        Remove <strong>product name</strong> ({4}) from your inventory?
                        <br />
                        This action cannot be undone.
                    </p>

                </div>

                {/* Actions */}
                <div className="delete-actions">

                    <button
                        type="button"
                        className="cancel-delete"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="confirm-delete"
                        onClick={deleteProduct}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}