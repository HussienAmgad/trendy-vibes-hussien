import React, { useState } from 'react';
import axios from 'axios';

export default function Addproduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [colors, setColors] = useState([{ color: '', hexCode: '', sizes: [] }]);
  const [imageUrls, setImageUrls] = useState(['']);
  const [priceBefore, setPriceBefore] = useState('');
  const [priceAfter, setPriceAfter] = useState('');
  const [productUrl, setProductUrl] = useState('');  // إضافة state لحفظ رابط المنتج

  const clothingDepartments = [
    'T-shirt', "Children's T-shirt", 'Tote bags', 'Over size', 'Kids hoodie', 'Backpacks', 'T-shirt sleeve', 'Hoodie', 'Sweatshirt', 'Over size hoodie',
  ];

  const nonClothingDepartments = [
    'Wall panels - paintings', 'Handbag / Makeup Bag / Pouch',
  ];

  const sizes = ['M', 'L', 'XL', 'XXL', '3XL'];

  const handleAddColor = () => {
    setColors([...colors, { color: '', hexCode: '', sizes: [] }]);
  };

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index].color = value;
    setColors(newColors);
  };

  const handleHexCodeChange = (index, value) => {
    const newColors = [...colors];
    newColors[index].hexCode = value;
    setColors(newColors);
  };

  const handleSizeToggle = (index, size) => {
    const newColors = [...colors];
    if (newColors[index].sizes.includes(size)) {
      newColors[index].sizes = newColors[index].sizes.filter((s) => s !== size);
    } else {
      newColors[index].sizes.push(size);
    }
    setColors(newColors);
  };

  const handleRemoveColor = (index) => {
    const newColors = colors.filter((_, idx) => idx !== index);
    setColors(newColors);
  };

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const handleRemoveImageUrl = (index) => {
    const newUrls = imageUrls.filter((_, idx) => idx !== index);
    setImageUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      imageUrls,
      priceBefore,
      priceAfter,
      department,
      colors,
      productUrl, // إضافة رابط المنتج هنا
    };

    try {
      const response = await axios.post('https://trendy-vibes-server.vercel.app/add-product', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Product added successfully');
      } else {
        alert(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add product');
    }
  };

  return (
<div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
  <div className="w-full max-w-2xl">
    <h1 className="text-2xl font-bold mb-6">Add Product</h1>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-medium mb-2">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className="w-full p-3 border rounded"
        />
      </div>

      <div>
        <label className="block text-lg font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          className="w-full p-3 border rounded"
        ></textarea>
      </div>

      <div>
        <label className="block text-lg font-medium mb-2">Product URL</label>
        <input
          type="url"
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
          placeholder="Enter product URL"
          className="w-full p-3 border rounded"
        />
      </div>

      <div>
        <label className="block text-lg font-medium mb-2">Product Images (URLs)</label>
        {imageUrls.map((url, index) => (
          <div key={index} className="mb-4 flex items-center gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              placeholder="Add image URL"
              className="w-full p-3 border rounded mb-2"
            />
            {url && (
              <div className="mt-2">
                <img src={url} alt={`Product Image ${index + 1}`} className="w-32 h-32 object-cover rounded" />
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemoveImageUrl(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddImageUrl}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Another URL
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-medium mb-2">Price Before Discount</label>
          <input
            type="number"
            value={priceBefore}
            onChange={(e) => setPriceBefore(e.target.value)}
            placeholder="Enter price"
            className="w-full p-3 border rounded"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Price After Discount</label>
          <input
            type="number"
            value={priceAfter}
            onChange={(e) => setPriceAfter(e.target.value)}
            placeholder="Enter discounted price"
            className="w-full p-3 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium mb-2">Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-3 border rounded"
        >
          <option value="">Select a department</option>
          <optgroup label="Clothing">
            {clothingDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </optgroup>
          <optgroup label="Non-Clothing">
            {nonClothingDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div>
        <label className="block text-lg font-medium mb-2">Colors</label>
        {colors.map((color, index) => (
          <div key={index} className="mb-4 flex items-center gap-2">
            <input
              type="text"
              value={color.color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              placeholder="Enter color"
              className="w-2/3 p-3 border rounded"
            />
            <input
              type="text"
              value={color.hexCode}
              onChange={(e) => handleHexCodeChange(index, e.target.value)}
              placeholder="Enter Hex Code"
              className="w-1/3 p-3 border rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveColor(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
            {clothingDepartments.includes(department) && (
              <div>
                <label className="block mb-2">Sizes</label>
                <div className="flex flex-wrap gap-4">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={color.sizes.includes(size)}
                        onChange={() => handleSizeToggle(index, size)}
                        className="mr-2"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddColor}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Another Color
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-3 rounded font-bold"
      >
        Submit Product
      </button>
    </form>
  </div>
</div>

  );
}
