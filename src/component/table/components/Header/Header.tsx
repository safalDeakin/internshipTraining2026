
import { X } from 'lucide-react'

const Header = () => {

    return (
        <>
            <div className="header">
                <h1>Table Name</h1>
                <button className="close-tab-btn">
                    <X />
                </button>
            </div>
            {/* <h2 className='search-title'>Search Items</h2>
            <div className="table-toolbar">
                <input
                    type='text'
                    placeholder='Search'
                    value={props.searchTerm}
                    onChange={(e) => props.onChange(e.target.value)}

                />
            </div> */}
        </>
    )
}

export default Header