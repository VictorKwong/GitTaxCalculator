# Git Tax Calculator Item List Component

🔗 **Live Demo:** [https://victorkwong.github.io/GitTaxCalculator](https://victorkwong.github.io/GitTaxCalculator)

🗓 **Last Updated:** 06-Oct-2025

# React Tax Calculator

A dynamic React component to calculate taxes and totals for a list of items. Designed with **accessibility (AODA)** and user-friendly features.

## Features

- **Editable Fields for Each Item**:
  - **Item Name** – text input.
  - **Price** – numeric input, supports default values.
  - **Tax Type** – dropdown (`None`, `HST`, `PST`, `GST`).

- **Automatic Calculations**:
  - Tax amount is calculated based on price and selected tax type.
  - Total price = Price + Tax Amount.

- **Manual Tax Override**:
  - Users can manually edit the tax amount.
  - **Lock/Unlock** button (🔓 / 🔒) allows:
    - **Locked**: tax amount does not change when price or tax type changes.
    - **Unlocked**: tax amount updates automatically.

- **Item Removal**:
  - Remove an item using the **Remove** button.

- **Default Settings**:
  - Collapsible section to set **Default Tax Type** and **Default Price** for new items.
  - Saves space when minimized and expands on demand.

- **Accessibility & AODA Compliance**:
  - High-contrast inputs and buttons.
  - Visible focus outlines for keyboard users.
  - `aria` attributes for screen readers.

## State Structure

```javascript
{
  name: "Sample Item",    // string
  price: 10.00,           // number or empty string
  taxType: "h",           // "h" = HST, "p" = PST, "g" = GST, "" = none
  taxAmount: 1.3,         // calculated or manually overridden
  taxLocked: false         // true if tax amount is locked
}
