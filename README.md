# Tax Calculator Item List Component

🔗 **Live Demo:** [https://VictorKwong.github.io/git-tax/](https://VictorKwong.github.io/git-tax/)

This React component renders a dynamic list of items with the following features:

- Each item has editable fields: **Item Name**, **Price**, and **Tax Type** (None, HST, PST, GST).
- Tax amount and total price (price + tax) are automatically calculated and displayed.
- Users can remove items from the list using the **Remove** button.
- The list is rendered as a grid with appropriate headers and input controls.

## Features

- Dynamic input fields for item name and price.
- Tax selection dropdown with options: None, HST, PST, GST.
- Automatic tax and total calculations.
- Item removal functionality.

## Usage

- The component expects an `items` array in state containing objects with `name`, `price`, and `taxType`.
- The `updateItem(index, field, value)` function updates the item properties.
- The `removeItem(index)` function removes an item from the list.
- The functions `getTaxAmount(price, taxType)` and `getTotal(price, taxAmount)` calculate tax and total.

### Example item object:

```js
{
  name: "Sample Item",
  price: 10.00,
  taxType: "h" // "h" for HST, "p" for PST, "g" for GST, or "" for none
}
