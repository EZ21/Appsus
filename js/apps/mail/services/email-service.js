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
    sentAt: 1645133930597,
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
];

export const emailService = {
  query,
  remove,
  save,
  getEmailById,
  getEmailsByFolder,
  addEmail,
  toggleMarkReadEmail,
  setEmailAsRead,
  toggleStarIcon,
  removeEmailDraft,
  saveEmailDraft,
  getEmailDraftById,
};

_createEmails();
storageService.query(EMAIL_DRAFTS_STORAGE_KEY) ||
  storageService.saveAll(EMAIL_DRAFTS_STORAGE_KEY, []);

function query() {
  return storageService.query(EMAIL_STORAGE_KEY);
}

// CREATE A DEMO EMAIL LIST:
function _createEmails() {
  let emails = storageService.query(EMAIL_STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = emailDemos;
    storageService.saveAll(EMAIL_STORAGE_KEY, emails);
  }
}
/*******************************************************************************/
function getEmailById(emailId) {
  return storageService.get(EMAIL_STORAGE_KEY, emailId);
}

function save(email) {
  if (email.id) return storageService.put(EMAIL_STORAGE_KEY, email);
  else return storageService.post(EMAIL_STORAGE_KEY, email);
}

function addEmail(email) {
  const sentEmail = {
    id: utilService.makeId(),
    subject: email.subject,
    body: email.body,
    isRead: false,
    isStar: false,
    sentAt: Date.now(),
    to: 'user@appsus.com',
  };
  console.log("new email added", sentEmail);
  return storageService.post(EMAIL_STORAGE_KEY, sentEmail);
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
        (email) => email.to === loggedinUser.email && !email.deletedAt
      );
    });
  } else if (folder === "inbox")
    return query().then((emails) =>
      emails.filter(
        (email) => email.to !== loggedinUser.email && !email.deletedAt
      )
    );
  else if (folder === "star")
    return query().then((emails) =>
      emails.filter((email) => email.isStar && !email.deletedAt)
    );
  else if (folder === "trash")
    return query().then((emails) => emails.filter((email) => email.deletedAt));
  else if (folder === "draft")
    return storageService.query(EMAIL_DRAFTS_STORAGE_KEY);
}

// EMAIL DRAFTS:
function getEmailDraftById(draftId) {
  return storageService.get(EMAIL_DRAFTS_STORAGE_KEY, draftId);
}

function removeEmailDraft(draftId) {
  return storageService.remove(EMAIL_DRAFTS_STORAGE_KEY, draftId);
}

function saveEmailDraft(draft) {
  if (draft.id) return storageService.put(EMAIL_DRAFTS_STORAGE_KEY, draft);
  else {
    draft.isDraft = true;
    return storageService.post(EMAIL_DRAFTS_STORAGE_KEY, draft);
  }
}