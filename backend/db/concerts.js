// Concerts collection: data access only, no Express here. (Julian Bowen)
import { getDb } from "./connection.js";

const concerts = () => getDb().collection("concerts");

// TODO: listConcerts({ freeOnly }), getConcert(id), createConcert(data),
// updateConcert(id, data), deleteConcert(id)
export { concerts };
