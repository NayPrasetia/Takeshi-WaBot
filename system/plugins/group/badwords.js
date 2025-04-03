module.exports = {
  command: "badwords",
  alias: [],
  category: ["group"],
  settings: {
    group: true,
    admin: true,  
  },
  description: "🚫 Aktifkan atau nonaktifkan filter kata terlarang",
  async run(m, { sock, text }) {
    if (!text)
      return m.reply({
        poll: {
          name: `*– 乂 Pengaturan Filter Kata Terlarang*\n\n> *\`0\`* - Matikan filter (Bot tidak akan menghapus pesan dengan kata terlarang)\n> *\`1\`* - Aktifkan filter (Bot akan menghapus pesan dengan kata terlarang)`,
          values: [`0`, `1`],
          selectableCount: 1,
        },
      });

    let settings = db.list().group[m.cht];
    settings.antibadwords = parseInt(text) > 0 ? true : false;

    m.reply(
      `> ✅ Fitur *Filter Kata Terlarang* berhasil ${text < 1 ? "dimatikan" : "diaktifkan"}. Bot akan ${text < 1 ? "tidak menghapus pesan yang mengandung kata terlarang" : "menghapus pesan yang mengandung kata terlarang"}.`,
    );
  },
};
