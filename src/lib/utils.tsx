/* eslint no-useless-escape: 0 */
/*transforms cloudinary image url*/
export const circlePic = (request: string) => {
  const image = validateImageURL(request)
  if (!image) return '/images/generic-user.png'
  const imageArr = image.split('/')
  const index = imageArr.findIndex((e) => e == 'upload')
  imageArr.splice(index + 1, 0, 'w_40,h_40,c_thumb,g_face,r_max')
  const returnValue = imageArr.join('/')
  return returnValue
}

/* check if the profile_pic is https, http or an ID */
export const validateImageURL = (image: string) => {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g
  if (regex.test(image)) {
    return image
  } else {
    return
  }
}

export const renderPrice = (price: number): string => {
  return '$' + price / 100
}

/* stripe functions */
export function formatAmountForDisplay(
  amount: number,
  currency: string
): string {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  return numberFormat.format(amount)
}

export function formatAmountForStripe(
  amount: number,
  currency: string
): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

export function formatAmountFromStripe(
  amount: number,
  currency: string
): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount / 100)
}
