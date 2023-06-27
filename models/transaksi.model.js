import mongoose from "mongoose";

const TransaksiSchema = new mongoose.Schema({
    transaksi_id: { type: String, unique: true },
    tanggal: Date,
    total_harga: Number,
    status_selesai: String,
    status_pembayaran: String,
    jenis_mobil: String,
    plat_nomor: String,
    detail_kerusakan: [{
        kerusakan: String,
        harga_perbaikan: Number,
    }],
})

const Transaksi = new mongoose.model('Transactions', TransaksiSchema)

export default Transaksi