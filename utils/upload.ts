/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { v2 as cloudinary } from 'cloudinary'
import path from 'node:path'

cloudinary.config({
  cloud_name: 'dyrxqtvlr',
  api_key: '619453128699628',
  api_secret: 'fWGoGBfzVKa8INUM_HMBACFmynA'
})

export interface CustomFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
}

export interface CustomUploadApiResponse {
  url: string
}
/* v8 ignore start */
export async function uploadCloudinary (
  file?: CustomFile
): Promise<string | undefined> {
  if (file) {
    const upload = await cloudinary.uploader.upload(
      path.join(__dirname, '..', 'uploads', file.originalname),
      { use_filename: true, unique_filename: false, overwrite: true }
    )
    return (upload as CustomUploadApiResponse).url
  }
  return undefined
}
/* v8 ignore stop */
