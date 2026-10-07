import './Navbar.css'

export default function Navbar() {
    return (
        <div className="nav">
            <div className="left">
                <div className="left-left">

                    <img src="/inventory-icon.svg" alt="Inventory Icon"
                        width="35"
                        height="35"
                    />
                    <h2 className='name'>Stockroom</h2>
                </div>
                <div className="inventory">inventory</div>
            </div>
            <div className="right">
                <p className="jdText">Acme workspace</p>
                <p className="JD">JD</p>
            </div>
        </div>
    )
}