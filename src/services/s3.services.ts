import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import 'dotenv/config'
import fs from 'fs'

const AWS_PUBLIC_KEY = process.env.AWS_ACCESS_PUBLIC_KEY ?? ''
const AWS_SECRET_KEY = process.env.AWS_ACCESS_SECRET_KEY ?? ''
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME ?? ''
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION ?? ''

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY
  }
})

export async function uploadFile (file: any): Promise<any> {
  const stream = fs.createReadStream(file.tempFilePath)
  const path: string[] = file.tempFilePath.split('-')
  const name: string = file.name
  const key = `${path[path.length - 1]}${name}`
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    Body: stream
  }

  const command = new PutObjectCommand(uploadParams)
  const response = await client.send(command)
  return {
    response,
    key
  }
}

export async function getFileUrl (filename: any): Promise<any> {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename
  })

  const response = await getSignedUrl(client, command, { expiresIn: 3600 })
  return response
}
