
const SearchBar = (props: any) => {
    return (
        <div>
            <h2 className='search-title'>Search Items</h2>
            <div className="table-toolbar">
                <input
                    type='text'
                    placeholder='Search'
                    // value={props.searchTerm}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchBar