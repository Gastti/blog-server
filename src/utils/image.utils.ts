import * as imageServices from '../services/image.services'

export const verifyExpirationDate = (date: string): boolean => {
  const currentDate = new Date()
  const expirationDate = new Date(date)
  return currentDate > expirationDate
}

export const handleExpiratedImage = async (key: string): Promise<boolean> => {
  try {
    await imageServices.updateImageUrlOnDatabase(key)
    console.log(`Presigned link generated for: ${key}`)
    return true
  } catch (error) {
    console.log(`The presigned link could not be generated for: ${key}`)
    return false
  }
}
