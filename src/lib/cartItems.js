/*
 * Validate Cart Items
 */
function validateCartItems(inventorySrc, cartDetails) {
  const validatedItems = []

  for (const id in cartDetails) {
    const inventoryItem = inventorySrc.find((currentProduct) => {
      return currentProduct.id === id || currentProduct.sku === id
    })

    let inventoryVariant = inventoryItem.priceVariants.filter(
      (variant) => variant.weight === cartDetails[id].price_data.weight
    )

    if (
      inventoryItem === undefined ||
      inventoryVariant.length != 1 ||
      inventoryVariant[0].price != cartDetails[id].price
    ) {
      throw new Error(
        `Invalid Cart: product with id "${id}" is not in your inventory or does not have a valid price.`
      )
    }

    inventoryVariant = inventoryVariant[0]

    const item = {
      price_data: {
        currency: 'USD',
        unit_amount: inventoryItem.price || inventoryVariant.price,
        product_data: {
          name: inventoryItem.name,
          ...inventoryItem.product_data,
        },
        ...cartDetails.price_data,
      },
      quantity: cartDetails[id].quantity,
    }

    if (
      cartDetails[id].product_data &&
      typeof cartDetails[id].product_data.metadata === 'object'
    ) {
      item.price_data.product_data.metadata = {
        ...item.price_data.product_data.metadata,
        ...cartDetails[id].product_data.metadata,
      }
    }

    if (
      typeof inventoryItem.description === 'string' &&
      inventoryItem.description.length > 0
    )
      item.price_data.product_data.description = inventoryItem.description

    if (
      typeof inventoryItem.image === 'string' &&
      inventoryItem.image.length > 0
    )
      item.price_data.product_data.images = [inventoryItem.image]

    validatedItems.push(item)
  }
  return validatedItems
}

function formatLineItems(cartDetails) {
  const lineItems = []
  for (const id in cartDetails)
    lineItems.push({ price: id, quantity: cartDetails[id].quantity })

  return lineItems
}

module.exports = {
  validateCartItems,
  formatLineItems,
}
