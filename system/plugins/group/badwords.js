module.exports = {
  command: "badwords",
  alias: ["bw"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,  
  },
  description: "🚫 Filter kata-kata terlarang dalam grup",
  loading: true,
  async run(m, { sock, text }) {
    if (!text || !["on", "off"].includes(text.toLowerCase()))
      throw `*– 乂 Cara Penggunaan Filter Kata Terlarang:*\n
> *🚫* Gunakan \`on\` untuk mengaktifkan filter kata kasar/terlarang\n
> *🚫* Gunakan \`off\` untuk menonaktifkan filter\n\n
*– 乂 Contoh Penggunaan:*\n
> *-* *${m.prefix}badwords on* - Aktifkan proteksi\n
> *-* *${m.prefix}badwords off* - Matikan proteksi\n\n
*– 乂 Penting!*\n
> *🔞* Saat aktif, bot akan otomatis menghapus pesan mengandung kata terlarang\n
> *⚠️* Admin tetap bisa mengirim pesan apapun`;

    const groupId = m.cht;
    const status = text.toLowerCase() === "on";
    
    if (!db.list().group[groupId]) db.list().group[groupId] = {};
    db.list().group[groupId].antibadwords = status;
    await db.save();
    
    await m.reply(
      `> ✅ *Filter kata terlarang berhasil ${status ? "diaktifkan" : "dimatikan"}!*\n` +
      `${status ? "> Bot akan menghapus otomatis pesan mengandung kata terlarang." : "> Bot tidak akan memfilter kata-kata kasar."}`
    );
  },
};