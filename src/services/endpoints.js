import axios from "axios";
const KANJI_API_URL = "https://kanjiapi.dev/v1/kanji";

export const generateKanjiGrade = (grade) => {
  return axios.get(`${KANJI_API_URL}/grade-${grade}`);
};

export const generateKanji = (kanji) => {
  return axios.get(`${KANJI_API_URL}/${kanji}`);
};
