// scripts/syncAnimeImages.js
import mysql from "mysql2/promise";

const ANILIST_API = "https://graphql.anilist.co";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const ANILIST_QUERY = `
  query ($search: String) {
    Media(search: $search, type: ANIME) {
      title {
        romaji
        english
      }
      coverImage {
        extraLarge
        large
        medium
      }
    }
  }
`;

async function fetchImageFromAniList(title, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(ANILIST_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: ANILIST_QUERY,
          variables: { search: title },
        }),
      });

      if (res.status === 429) {
        // AniList lagi dalam mode "degraded" (30 req/menit), header
        // Retry-After kadang kurang akurat saat mode ini aktif
        const retryAfter = Number(res.headers.get("retry-after")) || 5;
        console.log(`   status 429 untuk "${title}" (coba lagi ${attempt}/${retries}, tunggu ${retryAfter}s)...`);
        await delay(retryAfter * 1000);
        continue;
      }
      if (res.status === 504) {
        console.log(`   status ${res.status} untuk "${title}" (coba lagi ${attempt}/${retries})...`);
        await delay(3000 * attempt); // makin lama tiap percobaan ulang
        continue;
      }
      if (!res.ok) {
        console.log(`   status ${res.status} untuk "${title}"`);
        return null;
      }

      const json = await res.json();

      if (json.errors?.length) {
        console.log(`   GraphQL error untuk "${title}": ${json.errors[0].message}`);
        return null;
      }

      const cover = json.data?.Media?.coverImage;
      return cover?.extraLarge ?? cover?.large ?? cover?.medium ?? null;
    } catch (err) {
      console.log(`   fetch error untuk "${title}": ${err.message}`);
      await delay(2000);
    }
  }
  return null; // sudah dicoba beberapa kali, tetap gagal — skip
}

async function main() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "anime_list",
  });

  const [rows] = await db.query(
    `SELECT id, title FROM data_anime
     WHERE image IS NULL OR image = '' OR image NOT LIKE 'http%'`
  );
  console.log(`Ditemukan ${rows.length} anime yang perlu di-update.`);

  for (const anime of rows) {
    try {
      const imageUrl = await fetchImageFromAniList(anime.title);

      if (imageUrl) {
        await db.query("UPDATE data_anime SET image = ? WHERE id = ?", [imageUrl, anime.id]);
        console.log(`✅ ${anime.title} -> ${imageUrl}`);
      } else {
        console.log(`⚠️  "${anime.title}" tidak ditemukan / gagal di-fetch`);
      }
    } catch (err) {
      console.log(`❌ Error saat proses "${anime.title}": ${err.message}`);
    }

    // AniList saat ini dibatasi ~30 request/menit (bukan 60 seperti biasanya),
    // jadi jeda antar-anime dibuat lebih longgar dibanding versi Jikan
    await delay(2100);
  }

  await db.end();
  console.log("Selesai sinkronisasi gambar.");
}

main().catch((err) => console.error("Script berhenti total:", err));