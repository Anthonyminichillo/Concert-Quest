// Concert detail page: the concert itself, plus its edit and delete
// actions. (Julian Bowen)
import { api } from "./api.js";
import { askPasscode } from "./passcode-dialog.js";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short",
});
const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  trailingZeroDisplay: "stripIfInteger",
});

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// The server only accepts http(s) links; check again before using one as an
// href, since a javascript: URL would run when clicked.
function isWebLink(url) {
  try {
    return ["http:", "https:"].includes(new URL(url).protocol);
  } catch {
    return false;
  }
}

// `value` is a string or a node; append() adds strings as plain text.
function detailRow(list, label, value) {
  const dd = el("dd");
  dd.append(value);
  list.append(el("dt", "", label), dd);
}

// Fills `container` with the concert. User text only goes in via textContent.
export function renderConcertDetails(container, concert) {
  const isPast = new Date(concert.date) < new Date();
  document.title = `${concert.ensemble} | Concert Quest`;

  const heading = el("h1", "concert-detail__title", concert.ensemble);

  const facts = el("dl", "concert-detail__facts");
  const when = el("time", "", dateFormat.format(new Date(concert.date)));
  when.dateTime = concert.date;
  detailRow(facts, "When", when);
  detailRow(facts, "Where", concert.venue);
  detailRow(
    facts,
    "Price",
    concert.price === 0 ? "Free" : priceFormat.format(concert.price)
  );
  detailRow(facts, "Posted by", concert.posterName);

  container.replaceChildren(heading);
  if (isPast) {
    container.append(
      el(
        "p",
        "concert-detail__past",
        "This concert has already happened. Were you there? Leave a review below."
      )
    );
  }
  container.append(facts);

  if (concert.ticketUrl && isWebLink(concert.ticketUrl) && !isPast) {
    const tickets = el("a", "concert-detail__tickets", "Get tickets");
    tickets.href = concert.ticketUrl;
    tickets.target = "_blank";
    tickets.rel = "noopener noreferrer";
    container.append(tickets);
  }

  const pieces = (concert.program ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (pieces.length) {
    const program = el("section", "concert-detail__program");
    program.append(el("h2", "", "Program"));
    const list = el("ul");
    list.append(...pieces.map((piece) => el("li", "", piece)));
    program.append(list);
    container.append(program);
  }

  container.append(actions(concert));
}

function actions(concert) {
  const wrapper = el("div", "concert-detail__actions");

  const edit = el("a", "concert-detail__edit", "Edit concert");
  edit.href = `concert-form.html?id=${encodeURIComponent(concert._id)}`;

  const remove = el("button", "concert-detail__delete", "Delete concert");
  remove.type = "button";

  const status = el("p", "concert-detail__status");
  status.setAttribute("role", "alert");

  remove.addEventListener("click", async () => {
    status.textContent = "";
    const passcode = await askPasscode(
      "Delete this concert and its reviews? Enter the passcode it was posted with, or the admin passcode."
    );
    if (passcode === null) return;

    remove.disabled = true;
    try {
      await api(`/concerts/${encodeURIComponent(concert._id)}`, {
        method: "DELETE",
        body: { passcode },
      });
      location.href = "index.html";
    } catch (err) {
      status.textContent =
        err.status === 403
          ? "That passcode doesn't match this concert."
          : `Couldn't delete the concert: ${err.message}`;
      remove.disabled = false;
    }
  });

  wrapper.append(edit, remove, status);
  return wrapper;
}

export function renderConcertError(container, err) {
  document.title = "Concert not found | Concert Quest";
  const message =
    err.status === 404
      ? "This concert doesn't exist. It may have been deleted."
      : `Couldn't load this concert: ${err.message}`;
  const back = el("a", "", "Back to all concerts");
  back.href = "index.html";
  container.replaceChildren(
    el("h1", "", "Concert not found"),
    el("p", "", message),
    back
  );
}
