import nc from 'next-connect'
import middleware from '../../../middleware/all'
import { folder } from '../../../db'
import onError from '../../../middleware/error'
import { Request } from '../../../types'
import { NextApiResponse } from 'next'

const handler = nc<Request, NextApiResponse>({
  onError,
})

handler.use(middleware)

handler.post(async (req, res) => {
  const newFolder = await folder.createFolder(req.db, {
    createdBy: req.user.id as string,
    name: req.body.name,
  })

  res.send({ data: newFolder })
})

export default handler
