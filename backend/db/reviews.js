// Reviews collection: data access only, no Express here. (Jerith Gurusubburam)
import { getDb } from "./connection.js";

const reviews = () => getDb().collection("reviews");

// TODO: listReviews(concertId), createReview(data), updateReview(id, data),
// deleteReview(id)
export { reviews };
