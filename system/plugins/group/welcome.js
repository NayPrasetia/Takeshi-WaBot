module.exports = {
  command: "welcome",
  alias: ["wc"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
  },
  description: "🎊 Menyambut kedatangan/kepergian member",
  loading: true,
  async run(m, { sock, text }) {
    if (!text || !["on", "off"].includes(text.toLowerCase()))
      throw `*– 乂 Cara Penggunaan:*\n
> *🎊* Gunakan \`on\` untuk mengaktifkan sambutan kepada member yang masuk/keluar.\n
> *🎊* Gunakan \`off\` untuk menonaktifkan, sambutan tidak akan ada jika off.\n\n
*– 乂 Contoh Penggunaan:*\n
> *-* *${m.prefix + m.command} on* - Untuk mengaktifkan\n
> *-* *${m.prefix + m.command} off* - Untuk mematikan\n\n
*– 乂 Penting!*\n
> *📌* Jika diaktifkan maka bot akan secara otomatis memberi sambutan kepada member yang masuk/keluar.\n
> *📌* Jika dinonaktifkan maka bot tidak akan mengirim pesan sambutan secara otomatis.`;

    const groupId = m.cht;
    const status = text.toLowerCase() === "on";
    
    if (!db.list().group[groupId]) {
      db.list().group[groupId] = {};
    }
    db.list().group[groupId].welcomeGoodbye = status;
    await db.save();
    
    await m.reply(
      `> ✅ *Berhasil ${status ? "mengaktifkan" : "menonaktifkan"} welcome & goodbye!*\n${status ? "> Sekarang bot akan otomatis mengirim pesan sambutan." : "> Sekarang bot tidak akan mengirim sambutan."}`
    );
  },
};