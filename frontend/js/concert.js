// Concert detail page entry (concert.html?id=...). Loads the concert once,
// then hands it to the concert details module (Julian Bowen) and the reviews
// module (Jerith Gurusubburam).
import { api } from "./api.js";
import { renderConcertDetails, renderConcertError } from "./concert-details.js";
import { initReviews } from "./reviews.js";

const detail = document.getElementById("concert-detail");
const reviews = document.getElementById("reviews");
const id = new URLSearchParams(location.search).get("id");

try {
  if (!id) throw Object.assign(new Error("No concert id"), { status: 404 });
  const concert = await api(`/concerts/${encodeURIComponent(id)}`);
  renderConcertDetails(detail, concert);
  initReviews(concert);
} catch (err) {
  renderConcertError(detail, err);
  reviews.hidden = true;
}
