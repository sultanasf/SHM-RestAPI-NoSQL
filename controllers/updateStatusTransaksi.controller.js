import Transaksi from "../models/transaksi.model.js";

const updateStatusTransaksi = async (req, res) => {
    try {
        const { transaksiId, statusPembayaran, statusSelesai } = req.body

        const existingTransaksi = await Transaksi.findOne({ transaksi_id: transaksiId })

        existingTransaksi.status_pembayaran = statusPembayaran ? statusPembayaran : existingTransaksi.status_pembayaran
        existingTransaksi.status_selesai = statusSelesai ? statusSelesai : existingTransaksi.status_selesai
        await existingTransaksi.save()

        res.json({
            success: true,
            result: existingTransaksi,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan dalam mengambil data transaksi',
        });
    }
}

export default updateStatusTransaksi