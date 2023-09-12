import { Error } from '../enums'
import { ImageModel } from '../models/image.schema'
import { getFileUrl, uploadFile } from '../services/s3.services'

export const saveImageOnDatabase = async (imageFile: any): Promise<string | Error> => {
  try {
    const uploadImage = await uploadFile(imageFile)
    const currentDate = new Date()
    const expirationDate = new Date(currentDate.getTime() + 3600 * 1000)
    const url = await getFileUrl(uploadImage.key)
    const imageData = {
      url,
      key: uploadImage.key,
      expirationDate
    }

    const image = await ImageModel.create(imageData)

    if (image === null) return Error.BAD_REQUEST

    return image._id
  } catch (error) {
    console.log('Error in image.services.ts - saveImageOnDatabase', error)
    return Error.BAD_REQUEST
  }
}

export const updateImageUrlOnDatabase = async (key: string): Promise<string | Error> => {
  try {
    const generatePresignedUrl = await getFileUrl(key)
    const currentDate = new Date()
    const expirationDate = new Date(currentDate.getTime() + 3600 * 1000)

    console.log('New presigned link', generatePresignedUrl)

    await ImageModel.findOneAndUpdate(
      { key },
      { url: generatePresignedUrl, expirationDate }
    )

    return generatePresignedUrl
  } catch (error) {
    console.log('Error in image.services.ts - updateImageUrlOnDatabase', error)
    return Error.BAD_REQUEST
  }
}
