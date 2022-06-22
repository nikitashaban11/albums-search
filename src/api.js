import { fetchData } from "./utils";

const baseUrl = "https://itunes.apple.com";

const getAlbums = (band) => fetchData(`${baseUrl}/search?term=${band}`);

export { getAlbums };
