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
