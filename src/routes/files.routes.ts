import { Router, Request, Response } from 'express'
import { uploadFile } from '../services/s3.services'

const router = Router()

// Upload Files
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/upload', async (req: Request, res: Response) => {
  const result = await uploadFile(req.files?.file)
  console.log(result)
  res.json({
    ok: true
  })
})

export default router
