
import { useState } from "react";
import {
    Package,
    ChevronDown,
    MoreVertical,
    X,
    Trash2,
} from "lucide-react";

interface Product {
    id: number;
    name: string;
    code: string;
    price: number | null;
    quantity: number;
}

interface RegisterServiceProps {
    onClose?: () => void;
}

const initialProducts: Product[] = [
    {
        id: 1,
        name: "King Bed",
        code: "AF7899",
        price: 500,
        quantity: 3,
    },
    {
        id: 2,
        name: "Normal Bed",
        code: "AF7899",
        price: null,
        quantity: 15,
    },
];

export default function RegisterService({
    onClose,
}: RegisterServiceProps) {
    const [serviceCode, setServiceCode] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [category, setCategory] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [description, setDescription] = useState("");
    const [availableFor, setAvailableFor] = useState("Rooms");

    const [products, setProducts] = useState<Product[]>(initialProducts);

    const [selectedProduct, setSelectedProduct] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const [showNewProduct, setShowNewProduct] = useState(false);
    const [newProductName, setNewProductName] = useState("");

    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    const productOptions = [
        { name: "King Bed", code: "AF7899" },
        { name: "Normal Bed", code: "AF7899" },
        { name: "Extra Pillow", code: "AF7900" },
        { name: "Extra Blanket", code: "AF7901" },
        { name: "Towel", code: "AF7902" },
    ];

    const handleAddProduct = () => {
        if (!selectedProduct || !quantity || Number(quantity) <= 0) {
            return;
        }

        const selected = productOptions.find(
            (item) => item.name === selectedProduct
        );

        if (!selected) return;

        const newItem: Product = {
            id: Date.now(),
            name: selected.name,
            code: selected.code,
            price: price ? Number(price) : null,
            quantity: Number(quantity),
        };

        setProducts((prev) => [...prev, newItem]);

        setSelectedProduct("");
        setPrice("");
        setQuantity("");
    };

    const handleAddNewProduct = () => {
        if (!newProductName.trim()) return;

        productOptions.push({
            name: newProductName,
            code: `NEW${Date.now().toString().slice(-4)}`,
        });

        setSelectedProduct(newProductName);
        setNewProductName("");
        setShowNewProduct(false);
    };

    const handleRemoveProduct = (id: number) => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
        setActiveMenu(null);
    };

    const handleSave = () => {
        const serviceData = {
            serviceCode,
            serviceName,
            category,
            serviceType,
            description,
            availableFor,
            products,
        };

        console.log("Registered Service:", serviceData);
        onClose?.();
    };

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-3"
            onClick={onClose}
        >
            <div
                className="relative flex max-h-[95vh] w-full max-w-117.5 flex-col overflow-hidden rounded-lg bg-white shadow-xl animate-modal-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative flex items-center justify-between px-5 py-5">
                    <h2 className="text-base font-bold text-gray-900">
                        Register Service
                    </h2>

                    {onClose && (
                        <button
                            onClick={onClose}
                            className="absolute right-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <X size={17} />
                        </button>
                    )}
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto px-4 pb-3">

                    {/* Basic Information */}
                    <div className="mb-2">
                        <h3 className="mb-3 text-sm font-bold text-gray-900">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-2 gap-x-5 gap-y-3">

                            {/* Service Code */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-gray-800">
                                    Service Code
                                </label>
                                <input
                                    value={serviceCode}
                                    onChange={(e) => setServiceCode(e.target.value)}
                                    placeholder="Enter"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Service Name */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-gray-800">
                                    Service Name
                                </label>
                                <input
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                    placeholder="Enter"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-gray-800">
                                    Category
                                </label>
                                <input
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Enter"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Service Type */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-gray-800">
                                    Service Type
                                </label>
                                <div className="relative">
                                    <select
                                        value={serviceType}
                                        onChange={(e) => setServiceType(e.target.value)}
                                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500"
                                    >
                                        <option value="">Select</option>
                                        <option value="Product">Product</option>
                                        <option value="Service">Service</option>
                                        <option value="Both">Both</option>
                                    </select>
                                    <ChevronDown
                                        size={15}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Description */}
                        <div className="mt-3">
                            <label className="mb-1.5 block text-xs font-semibold text-gray-800">
                                Description
                            </label>
                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Available For */}
                        <div className="mt-3 w-1/2 pr-2">
                            <label className="mb-1.5 block text-xs font-semibold text-gray-800">
                                Available For
                            </label>
                            <select
                                value={availableFor}
                                onChange={(e) => setAvailableFor(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500"
                            >
                                <option value="Rooms">Rooms</option>
                                <option value="Restaurant">Restaurant</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="mt-3 min-h-85 rounded-lg bg-gray-50 p-2.5">

                        <h3 className="mb-3 text-xs font-medium text-gray-700">
                            Product Details
                        </h3>

                        {/* Product Input Row */}
                        <div className="grid grid-cols-[1.5fr_1fr_0.8fr_auto] gap-2">

                            <div className="relative">
                                <select
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                    className="w-full appearance-none rounded-md border border-gray-200 bg-white px-2 py-2.5 pr-7 text-[11px] text-gray-600 outline-none focus:border-blue-400"
                                >
                                    <option value="">Enter P.Name or P.Code</option>
                                    {productOptions.map((product) => (
                                        <option key={product.code + product.name} value={product.name}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={14}
                                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                />
                            </div>

                            <input
                                type="number"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                                className="min-w-0 rounded-md border border-gray-200 px-2 py-2.5 text-[11px] outline-none focus:border-blue-400"
                            />

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Quantity"
                                className="min-w-0 rounded-md border border-gray-200 px-2 py-2.5 text-[11px] outline-none focus:border-blue-400"
                            />

                            <button
                                onClick={handleAddProduct}
                                disabled={!selectedProduct || !quantity || Number(quantity) <= 0}
                                className="rounded-md bg-gray-400 px-4 text-xs font-medium text-white transition hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Add
                            </button>
                        </div>

                        {/* Add New Product */}
                        <button
                            onClick={() => setShowNewProduct(!showNewProduct)}
                            className="mt-2 text-[11px] text-sky-600 hover:text-sky-700"
                        >
                            + Add New Product?
                        </button>

                        {showNewProduct && (
                            <div className="mt-2 flex gap-2">
                                <input
                                    value={newProductName}
                                    onChange={(e) => setNewProductName(e.target.value)}
                                    placeholder="Enter product name"
                                    className="min-w-0 flex-1 rounded-md border border-gray-200 px-2 py-2 text-xs outline-none focus:border-blue-400"
                                />
                                <button
                                    onClick={handleAddNewProduct}
                                    disabled={!newProductName.trim()}
                                    className="rounded-md bg-blue-600 px-3 text-xs text-white disabled:opacity-50"
                                >
                                    Add
                                </button>
                            </div>
                        )}

                        {/* Product List */}
                        <div className="mt-4">
                            <p className="mb-2 text-xs font-medium text-gray-700">
                                Lists
                            </p>

                            <div className="border border-gray-200 bg-white p-1.5">
                                {products.length === 0 ? (
                                    <p className="py-5 text-center text-xs text-gray-400">
                                        No products added yet.
                                    </p>
                                ) : (
                                    <div className="space-y-1">
                                        {products.map((product, index) => (
                                            <div
                                                key={product.id}
                                                className="relative flex min-h-10.5 items-center gap-2 border border-gray-100 px-2 py-2"
                                            >
                                                <span className="w-4 text-xs text-gray-500">
                                                    {index + 1}.
                                                </span>

                                                <div className="flex min-w-0 flex-1 items-center gap-1.5">
                                                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gray-100">
                                                        <Package size={13} className="text-green-600" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <span className="text-xs font-medium text-blue-600">
                                                            {product.name}
                                                        </span>
                                                        <span className="ml-1 text-[10px] text-blue-400">
                                                            #{product.code}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="w-23.75 text-center text-xs text-gray-600">
                                                    {product.price !== null
                                                        ? `${product.price} each`
                                                        : "Enter amount"}
                                                </div>

                                                <div className="w-12 text-right text-xs text-gray-700">
                                                    {product.quantity}pcs
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        setActiveMenu(
                                                            activeMenu === product.id
                                                                ? null
                                                                : product.id
                                                        )
                                                    }
                                                    className="rounded p-1 text-gray-600 hover:bg-gray-100"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                {activeMenu === product.id && (
                                                    <div className="absolute right-2 top-9 z-20 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                                                        <button
                                                            onClick={() => handleRemoveProduct(product.id)}
                                                            className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                                                        >
                                                            <Trash2 size={13} />
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center border-t border-gray-100 bg-white px-4 py-3">
                    <button
                        onClick={handleSave}
                        className="flex w-35 items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white shadow-md transition hover:bg-orange-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
