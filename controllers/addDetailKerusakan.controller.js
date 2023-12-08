import Transaksi from "../models/transaksi.model.js";

const addDetailKerusakan = async (req, res) => {
    try {
        const { transaksi_id, detail_kerusakan } = req.body

        const existingTransaksi = await Transaksi.findOne({ transaksi_id })

        if (!existingTransaksi) {
            return res.status(404).json({
                success: false,
                message: "Transaksi tidak ditemukan",
            });
        }

        const kerusakanData = detail_kerusakan.filter(
            (item) => (item.kerusakan !== "") && (item.harga_perbaikan !== 0)
                && (item.harga_perbaikan !== null) && (item.harga_perbaikan !== undefined)
        )

        const totalHarga = kerusakanData.reduce((total, item) => total + item.harga_perbaikan, 0)

        existingTransaksi.total_harga = totalHarga;
        existingTransaksi.detail_kerusakan = kerusakanData;
        await existingTransaksi.save();
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

export default addDetailKerusakan