import Transaksi from "../models/transaksi.model.js";

const getTransaksi = async (req, res) => {
    try {
        const transaksiData = await Transaksi.find({})

        const formattedTransaksiData = transaksiData.map((transaksi) => ({
            transaksi_id: transaksi.transaksi_id,
            detail_transaksi: {
                tanggal: transaksi.tanggal,
                total_harga: transaksi.total_harga,
                status_selesai: transaksi.status_selesai,
                status_pembayaran: transaksi.status_pembayaran,
                mobil: {
                    jenis_mobil: transaksi.jenis_mobil,
                    plat_nomor: transaksi.plat_nomor
                },
                detail_kerusakan: transaksi.detail_kerusakan,
            },
        }));

        res.json({
            success: true,
            result: formattedTransaksiData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan dalam mengambil data transaksi',
        });
    }
};

export default getTransaksi