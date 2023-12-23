/* v8 ignore start */
import express, { type Response, type Request } from 'express'
import path from 'path'

const publicDir: string = path.join(__dirname, '../../public')
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  const filePath: string = path.join(publicDir, 'index.example.html')
  res.sendFile(filePath)
})

router.get('/cars', (req: Request, res: Response) => {
  const filePath: string = path.join(publicDir, 'cars.html')
  res.sendFile(filePath)
})

router.use(express.static(publicDir, {
  setHeaders: (res: Response, path: string, stat: any) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript')
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css')
    }
  }
}))

export default router
/* v8 ignore stop */
