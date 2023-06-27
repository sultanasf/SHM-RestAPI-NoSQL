import express from "express"
import insertTransaksi from "../controllers/insertTransaksi.controller.js"
import getTransaksi from "../controllers/getTransaksi.controller.js"
import addDetailKerusakan from "../controllers/addDetailKerusakan.controller.js"
import updateStatusTransaksi from "../controllers/updateStatusTransaksi.controller.js"

const router = express.Router()

router.post('/', insertTransaksi)
router.get('/', getTransaksi)
router.post('/add-detail', addDetailKerusakan)
router.patch('/edit-status', updateStatusTransaksi)

export default router