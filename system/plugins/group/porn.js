module.exports = {
  command: "porn",
  alias: ["antiporn"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,  
  },
  description: "🔞 Filter konten dewasa dalam grup",
  loading: true,
  async run(m, { sock, text }) {
    if (!text || !["on", "off"].includes(text.toLowerCase()))
      throw `*– 乂 Cara Penggunaan Filter Konten Dewasa:*\n
> *🔞* Gunakan \`on\` untuk mengaktifkan filter gambar/sticker porno\n
> *🔞* Gunakan \`off\` untuk menonaktifkan filter\n\n
*– 乂 Contoh Penggunaan:*\n
> *-* *${m.prefix}porn on* - Aktifkan proteksi\n
> *-* *${m.prefix}porn off* - Matikan proteksi\n\n
*– 乂 Penting!*\n
> *🚨* Sistem menggunakan AI untuk deteksi konten sensitif\n
> *⏱️* Mungkin ada delay 1-3 detik saat pengecekan`;

    const groupId = m.cht;
    const status = text.toLowerCase() === "on";
    
    if (!db.list().group[groupId]) db.list().group[groupId] = {};
    db.list().group[groupId].antiporn = status;
    await db.save();
    
    await m.reply(
      `> ✅ *Filter konten dewasa berhasil ${status ? "diaktifkan" : "dimatikan"}!*\n` +
      `${status ? "> Bot akan menghapus otomatis konten terdeteksi NSFW." : "> Bot tidak akan memfilter konten dewasa."}`
    );
  },
};