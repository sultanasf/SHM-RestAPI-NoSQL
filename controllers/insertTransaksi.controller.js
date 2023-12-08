import Transaksi from "../models/transaksi.model.js";
import { v1 as uuidv1 } from 'uuid';

const insertTransaksi = async (req, res) => {
    try {
        const { tanggal, jenisMobil, platNomor, detailKerusakanData, statusPembayaran, statusSelesai } = req.body;

        //filteredDetailKerusakanData
        for (let i = detailKerusakanData.length - 1; i >= 0; i--) {
            if (detailKerusakanData[i].jenisKerusakan === "") {
                detailKerusakanData.splice(i, 1);
            }
        }

        // Calculate the total price from detail kerusakan
        const totalHarga = detailKerusakanData.reduce(
            (total, kerusakan) => total + kerusakan.hargaPerbaikan,
            0
        );

        // Create a new transaction
        const transaksi = new Transaksi({
            transaksi_id: uuidv1(),
            tanggal: new Date(tanggal),
            total_harga: totalHarga,
            status_selesai: statusSelesai,
            status_pembayaran: statusPembayaran,
            jenis_mobil: jenisMobil,
            plat_nomor: platNomor,
            detail_kerusakan: detailKerusakanData.map((kerusakan) => ({
                kerusakan: kerusakan.jenisKerusakan,
                harga_perbaikan: kerusakan.hargaPerbaikan,
            })),
        });

        // Save the transaction to the database
        await transaksi.save();

        res.json({
            success: true,
            message: 'Transaksi berhasil dibuat',
            result: transaksi,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan dalam membuat transaksi',
            error: error.message,
        });
    }
};

export default insertTransaksi