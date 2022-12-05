/*transforms cloudinary image url*/
export const circlePic = (request: string) => {
  let image = validateImageURL(request)
  if (!image) return '/images/generic-user.png'
  const imageArr = image.split('/')
  const index = imageArr.findIndex((e) => e == 'upload')
  imageArr.splice(index + 1, 0, 'w_40,h_40,c_thumb,g_face,r_max')
  const returnValue = imageArr.join('/')
  return returnValue
}

/* check if the profile_pic is https, http or an ID */
export const validateImageURL = (image: string) => {
  let regex =
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
