import React, { useState } from 'react';
import './App.css';

const TAX_RATES = {
  h: 0.13, // HST
  p: 0.08, // PST
  g: 0.05  // GST
};

const taxLabel = {
  h: 'HST',
  p: 'PST',
  g: 'GST'
};

export default function TaxCalculator() {
  const [items, setItems] = useState([
    { name: 'Bread', price: 0, taxType: '' }
  ]);

  const addItem = () => {
    setItems([...items, { name: '', price: 0, taxType: '' }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    if (field === 'price') value = parseFloat(value) || 0;
    newItems[index][field] = value;
    setItems(newItems);
  };

  const getTaxAmount = (price, taxType) => {
    const rate = TAX_RATES[taxType] || 0;
    return parseFloat((price * rate).toFixed(2));
  };

  const getTotal = (price, tax) => {
    return parseFloat((price + tax).toFixed(2));
  };

  const removeItem = (indexToRemove) => {
    const updated = items.filter((_, i) => i !== indexToRemove);
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const totalTax = items.reduce((sum, item) => sum + getTaxAmount(item.price, item.taxType), 0);
  const grandTotal = subtotal + totalTax;

  return (
<div className="container">
  <h1 className="title">Tax Calculator</h1>

<div className="table-header">
  <div>Item Name</div>
  <div>Price</div>
  <div>Tax Type</div>
  <div>Tax Amount</div>
  <div>Total</div>
  <div>Action</div> {/* New column header */}
</div>

  {items.map((item, index) => {
  const tax = getTaxAmount(item.price, item.taxType);
  const total = getTotal(item.price, tax);
  return (
    <div key={index} className="table-row">
      <input
        className="cell-input"
        type="text"
        value={item.name}
        onChange={(e) => updateItem(index, 'name', e.target.value)}
      />
      <input
        className="cell-input"
        type="number"
        value={item.price}
        onChange={(e) => updateItem(index, 'price', e.target.value)}
      />
      <select
        className="cell-select"
        value={item.taxType}
        onChange={(e) => updateItem(index, 'taxType', e.target.value)}
      >
        <option value="">None</option>
        <option value="h">HST</option>
        <option value="p">PST</option>
        <option value="g">GST</option>
      </select>
      <div className="cell-output">{tax.toFixed(2)}</div>
      <div className="cell-output">{total.toFixed(2)}</div>
      <button
        className="remove-btn"
        onClick={() => removeItem(index)}
      >
        ✖
      </button>
    </div>
  );
})}

  <button onClick={addItem} className="add-button">
    Add Item
  </button>

  <div className="summary">
    <div>Subtotal: <strong>${subtotal.toFixed(2)}</strong></div>
    <div>Tax: <strong>${totalTax.toFixed(2)}</strong></div>
    <div>Total: <strong>${grandTotal.toFixed(2)}</strong></div>
  </div>
</div>


  );
}
