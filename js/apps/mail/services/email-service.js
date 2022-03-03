import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

const EMAIL_STORAGE_KEY = "emailDB";
const EMAIL_DRAFTS_STORAGE_KEY = "emailDraftsDB";

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

const emailDemos = [
  {
    id: "e101",
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: false,
    sentAt: 1551133930594,
    to: "momo@momo.com",
  },

  {
    id: "e102",
    subject: "Appointment",
    body: "Our appointment is today",
    isRead: false,
    sentAt: 1551133930596,
    to: "jack@mail.com",
  },

  {
    id: "e103",
    subject: "Your order",
    body: "Details about your order from Conglomo",
    isRead: false,
    sentAt: 1771133930597,
    to: "service@mail.com",
  },

  {
    id: "e104",
    subject: "Job offer",
    body: "We have a new position open for you",
    isRead: false,
    sentAt: 1636552305402,
    to: "job@mail.com",
  },
]

export const emailService = {
  query,
  remove,
  save,
  getById,
  getEmailsByFolder,
  addEmail,
  toggleMarkReadEmail,
  setEmailAsRead,
  toggleStarIcon,
  removeEmailDraft,
  saveEmailDraft,
  getEmailDraftById,
  noteToEmailEntity,
};

_createEmails();
utilService.loadFromStorage(EMAIL_DRAFTS_STORAGE_KEY) ||
  utilService.saveToStorage(EMAIL_DRAFTS_STORAGE_KEY, []);

function query() {
  return storageService.query(EMAIL_STORAGE_KEY);
}

// CREATE A DEMO EMAIL LIST:
function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = emailDemos;
    utilService.saveToStorage(EMAIL_STORAGE_KEY, emails);
  }
}
/*******************************************************************************/
function getById(emailId) {
  return storageService.get(EMAIL_STORAGE_KEY, emailId);
}

function save(email) {
  if (email.id) return storageService.put(EMAIL_STORAGE_KEY, email);
  else return storageService.post(EMAIL_STORAGE_KEY, email);
}

function addEmail(email) {
  const formatEmail = {
    id: utilService.makeId(),
    subject: email.subject,
    body: email.body,
    isRead: false,
    isStar: false,
    sentAt: Date.now(),
    to: "user@appsus.com",
  };
  if (email.imageUrl) {
    formatEmail.imageUrl = email.imageUrl;
  }
  return storageService.post(EMAIL_STORAGE_KEY, formatEmail);
}

function remove(emailId) {
  return storageService.remove(EMAIL_STORAGE_KEY, emailId);
}

function toggleMarkReadEmail(email) {
  email.isRead = !email.isRead;
  return storageService.put(EMAIL_STORAGE_KEY, email);
}

function toggleStarIcon(email) {
  email.isStar = !email.isStar;
  return storageService.put(EMAIL_STORAGE_KEY, email);
}

function setEmailAsRead(email) {
  email.isRead = true;
  return storageService.put(EMAIL_STORAGE_KEY, email);
}

function getEmailsByFolder(folder) {
  if (folder === "sent") {
    return query().then((emails) => {
      return emails.filter(
        (email) => email.to === loggedinUser.email && !email.removedAt
      );
    });
  } else if (folder === "inbox")
    return query().then((emails) =>
      emails.filter(
        (email) => email.to !== loggedinUser.email && !email.removedAt
      )
    );
  else if (folder === "star")
    return query().then((emails) =>
      emails.filter((email) => email.isStar && !email.removedAt)
    );
  else if (folder === "trash")
    return query().then((emails) => emails.filter((email) => email.removedAt));
  else if (folder === "draft") return storageService.query(emailDraftsDB);
}

// EMAIL DRAFTS:
