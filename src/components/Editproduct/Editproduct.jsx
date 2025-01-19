import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function EditProduct() {
  const location = useLocation();
  const id = location.state;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [colors, setColors] = useState([{ colorName: '', colorCode: '', sizes: [] }]);
  const [imageUrls, setImageUrls] = useState(['']);
  const [priceBefore, setPriceBefore] = useState('');
  const [priceAfter, setPriceAfter] = useState('');
  const [productUrl, setProductUrl] = useState('');

  const clothingDepartments = [
    'T-shirt', "Children's T-shirt", 'Tote bags', 'Over size', 'Kids hoodie',
    'Backpacks', 'T-shirt sleeve', 'Hoodie', 'Sweatshirt', 'Over size hoodie',
  ];

  const nonClothingDepartments = [
    'Wall panels - paintings', 'Handbag / Makeup Bag / Pouch',
  ];

  const sizes = ['M', 'L', 'XL', 'XXL', '3XL'];

  useEffect(() => {
    if (id) {
      axios.get(`https://trendy-vibes-server.vercel.app/products/${id}`)
        .then((response) => {
          const data = response.data;
          setName(data.name);
          setDescription(data.description);
          setPriceBefore(data.priceBefore);
          setPriceAfter(data.priceAfter);
          setDepartment(data.department);
          setImageUrls(data.imageUrls || ['']);
          setColors(data.colors || [{ colorName: '', colorCode: '', sizes: [] }]);
          setProductUrl(data.productUrl || '');
        })
        .catch((error) => console.error('Error fetching product data:', error));
    }
  }, [id]);

  const handleAddColor = () => {
    setColors([...colors, { colorName: '', colorCode: '', sizes: [] }]);
  };

  const handleColorChange = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const handleRemoveColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
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

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleRemoveImageUrl = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
  };

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, '']);
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
      productUrl,
    };

    try {
      const { data } = await axios.put(`https://trendy-vibes-server.vercel.app/products/${id}`, productData);
      if (data.success) {
        alert('Product updated successfully');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">

        {/* Product Name */}
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Product URL */}
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">Product URL</label>
          <input
            type="url"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            placeholder="Enter product URL"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image URLs */}
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">Product Images (URLs)</label>
          {imageUrls.map((url, index) => (
            <div key={index} className="mb-4 flex items-center gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                placeholder="Add image URL"
                className="w-3/4 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {url && (
                <div className="flex items-center gap-2">
                  <img
                    src={url}
                    alt={`Image preview ${index}`}
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImageUrl(index)}
                    className="bg-red-500 text-white py-2 rounded"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Add Another URL
          </button>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Price Before Discount</label>
            <input
              type="number"
              value={priceBefore}
              onChange={(e) => setPriceBefore(e.target.value)}
              placeholder="Enter price"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Price After Discount</label>
            <input
              type="number"
              value={priceAfter}
              onChange={(e) => setPriceAfter(e.target.value)}
              placeholder="Enter discounted price"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        {/* Colors */}
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">Colors</label>
          {colors.map((color, index) => (
            <div key={index} className="mb-4 flex items-center gap-4">
              <input
                type="text"
                value={color.color}
                onChange={(e) => handleColorChange(index, 'colorName', e.target.value)}
                placeholder="Enter color name (e.g., Red)"
                className="w-1/3 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={color.colorCode}
                onChange={(e) => handleColorChange(index, 'colorCode', e.target.value)}
                placeholder="Enter color code (e.g., #FF5733)"
                className="w-1/3 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Add size options */}
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-700">Sizes</label>
                {sizes.map((size) => (
                  <label key={size} className="mr-4 flex items-center">
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

              <button
                type="button"
                onClick={() => handleRemoveColor(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddColor}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Add Color
          </button>
        </div>


        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
