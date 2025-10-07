import React, { useState } from 'react';
import './App.css';

const TAX_RATES = {
  h: 0.13, // HST
  p: 0.08, // PST
  g: 0.05  // GST
};

export default function TaxCalculator() {
  const [items, setItems] = useState([
    { name: 'Bread', price: '', taxType: '', taxAmount: '', taxLocked: false }
  ]);

  const [defaultTaxType, setDefaultTaxType] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');

  const addItem = () => {
    const price = defaultPrice === '' ? '' : parseFloat(defaultPrice);
    setItems([
      ...items,
      {
        name: '',
        price: price,
        taxType: defaultTaxType,
        taxAmount: defaultTaxType && price ? parseFloat((price * TAX_RATES[defaultTaxType]).toFixed(2)) : '',
      }
    ]);
  };

const updateItem = (index, field, value) => {
  const newItems = [...items];
  const item = newItems[index];

  if (field === 'price') {
    item.price = value === '' ? '' : parseFloat(value);

    // Only recalc tax if not locked
    if (!item.taxLocked && item.taxType) {
      const price = parseFloat(value) || 0;
      item.taxAmount = parseFloat((price * TAX_RATES[item.taxType]).toFixed(2));
    }

  } else if (field === 'taxType') {
    const price = parseFloat(item.price) || 0;

    if (!item.taxLocked) {
      // If user re-selects the same tax type, reset to default
      if (value === item.taxType) {
        item.taxAmount = value ? parseFloat((price * TAX_RATES[value]).toFixed(2)) : '';
      } else {
        // Changing to a different tax type
        item.taxAmount = value ? parseFloat((price * TAX_RATES[value]).toFixed(2)) : '';
      }
    }

    item.taxType = value;

  } else if (field === 'taxAmount') {
    // Always allow manual change
    item.taxAmount = value === '' ? '' : parseFloat(value);

  } else if (field === 'taxLocked') {
    item.taxLocked = value;

  } else if (field === 'name') {
    item.name = value;
  }

  setItems(newItems);
};




  const removeItem = (indexToRemove) => {
    setItems(items.filter((_, i) => i !== indexToRemove));
  };

  const subtotal = items.reduce((sum, item) => {
    const p = parseFloat(item.price);
    return sum + (Number.isFinite(p) ? p : 0);
  }, 0);

  const totalTax = items.reduce((sum, item) => {
    const t = parseFloat(item.taxAmount);
    return sum + (Number.isFinite(t) ? t : 0);
  }, 0);

  const grandTotal = subtotal + totalTax;

  return (
    <div className="container">
      <h1 className="title">GitTax Calculator</h1>

<fieldset className="default-tax-selector"> 
  <legend style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a' }}>
    Default Settings
  </legend>

  <div className="default-tax-item">
    <label htmlFor="defaultTaxType" className="default-tax-label">
      Default Tax Type:
    </label>
    <select
      id="defaultTaxType"
      value={defaultTaxType}
      onChange={(e) => setDefaultTaxType(e.target.value)}
      className="cell-select"
      aria-describedby="defaultTaxDesc"
    >
      <option value="">None</option>
      <option value="h">HST</option>
      <option value="p">PST</option>
      <option value="g">GST</option>
    </select>
    <p id="defaultTaxDesc" className="default-tax-desc">
      This tax type will be automatically applied to new items you add.
    </p>
  </div>

  <div className="default-tax-item" style={{ marginTop: '1rem' }}>
    <label htmlFor="defaultPrice" className="default-tax-label">
      Default Price:
    </label>
    <input
      id="defaultPrice"
      type="number"
      step="1"
      value={defaultPrice}
      onChange={(e) => setDefaultPrice(e.target.value)}
      className="cell-input"
      placeholder="0.00"
      aria-describedby="defaultPriceDesc"
    />
    <p id="defaultPriceDesc" className="default-tax-desc">
      The default price used when adding a new item. Can be empty to start blank.
    </p>
  </div>
</fieldset>


<table className="tax-table">
  <caption className="sr-only">Items, Prices, Tax, and Totals</caption>
  <thead>
    <tr>
      <th scope="col">Item Name</th>
      <th scope="col">Price</th>
      <th scope="col">Tax Type</th>
      <th scope="col">Tax Amount</th>
      <th scope="col">Total</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item, index) => {
      const total = (parseFloat(item.price) || 0) + (parseFloat(item.taxAmount) || 0);
      return (
        <tr key={index}>
          <td>
            <input
              className="cell-input"
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
            />
          </td>
          <td>
            <input
              className="cell-input"
              type="number"
              value={item.price}
              onChange={(e) => updateItem(index, 'price', e.target.value)}
            />
          </td>
          <td>
            <select
              className="cell-select"
              value={item.taxType}
              onChange={(e) => updateItem(index, 'taxType', e.target.value)}
              onClick={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue === item.taxType && selectedValue !== '') {
                  const price = parseFloat(item.price) || 0;
                  updateItem(index, 'taxType', selectedValue); // reset taxAmount
                }
              }}
            >
              <option value="">None</option>
              <option value="h">HST</option>
              <option value="p">PST</option>
              <option value="g">GST</option>
            </select>
          </td>
          <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              className="cell-input"
              type="number"
              step="0.01"
              value={item.taxAmount}
              onChange={(e) => updateItem(index, 'taxAmount', e.target.value)}
              disabled={item.taxLocked}
            />
            <button
              type="button"
              className={`lock-btn ${item.taxLocked ? 'locked' : ''}`}
              onClick={() => updateItem(index, 'taxLocked', !item.taxLocked)}
              aria-label={item.taxLocked ? "Unlock tax amount" : "Lock tax amount"}
            >
              {item.taxLocked ? '🔒' : '🔓'}
            </button>
          </td>
          <td className="cell-static">{total.toFixed(2)}</td>
          <td>
            <button
              className="remove-btn"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${item.name || 'item'}`}
            >
              ✖
            </button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>


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
