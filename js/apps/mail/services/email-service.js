import { utilService } from '../../../services/util.service.js';

const EMAIL_STORAGE_KEY = "emailDB";
// const EMAIL_DRAFTS_STORAGE_KEY = "emailDraftsDB";

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus"
};

const email = {
  id: 'e101',
  subject: 'Miss you!',
  body: 'Would love to catch up sometimes',
  isRead: false, sentAt : 1551133930594,
  to: 'momo@momo.com'
};

export const emailService = {
  query,
  remove,
  save,
//   getById,
//   getEmailsByFolder,
//   toggleReadEmail,
//   setEmailAsRead,
//   toggleMarkedWithStar,
//   removeEmailDraft,
//   saveEmailDraft,
//   getEmailDraftById,
//   noteToEmailEntity
};

_createEmails();
utilService.loadFromStorage(EMAIL_DRAFTS_STORAGE_KEY) ||
  utilService.saveToStorage(EMAIL_DRAFTS_STORAGE_KEY, []);

function query() {
  return storageService.query(EMAIL_STORAGE_KEY);
};

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_STORAGE_KEY);
    if(!emails || !emails.length) {
        emails = email;
        utilService.saveToStorage(EMAIL_STORAGE_KEY, emails)
    };
};
/*******************************************************************************/
function getById(emailId) {
  return storageService.get(EMAIL_STORAGE_KEY, emailId);
};

function save(email) {
  if (email.id) return storageService.put(EMAIL_STORAGE_KEY, email);
  else return storageService.post(EMAIL_STORAGE_KEY, email);
};

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
};

function noteToEmailEntity(note) {
  const noteEmail = {
    subject: null,
    body: null,
    isRead: false,
    isStar: false,
    sentAt: Date.now(),
    to: "user@appsus.com",
  };
  if (note.body.includes("http")) {
    noteEmail.imageUrl = note.body;
  } else {
    noteEmail.body = note.body;
  }
  noteEmail.subject = note.subject;
  return Promise.resolve(noteEmail);
};

function remove(emailId) {
  return storageService.remove(EMAIL_STORAGE_KEY, emailId);
};

function toggleReadEmail(email) {
  email.isRead = !email.isRead;
  return storageService.put(EMAIL_STORAGE_KEY, email);
};

function toggleMarkedWithStar(email) {
  email.isStar = !email.isStar;
  return storageService.put(EMAIL_STORAGE_KEY, email);
};

function setEmailAsRead(email) {
  email.isRead = true;
  return storageService.put(EMAIL_STORAGE_KEY, email);
};

function getEmailsByFolder(folder) {
  if (folder === "sent") {
    return query().then((emails) => {
      return emails.filter((e) => e.to === loggedinUser.email && !e.removedAt);
    });
  } else if (folder === "inbox")
    return query().then((emails) =>
      emails.filter((e) => e.to !== loggedinUser.email && !e.removedAt)
    );
  else if (folder === "star")
    return query().then((emails) =>
      emails.filter((e) => e.isStar && !e.removedAt)
    );
  else if (folder === "trash")
    return query().then((emails) => emails.filter((e) => e.removedAt));
  else if (folder === "draft") return storageService.query(DRAFTS_KEY);
};

// EMAIL DRAFTS:
function getEmailDraftById(draftId) {
  return storageService.get(DRAFTS_KEY, draftId);
};

function removeEmailDraft(draftId) {
  return storageService.remove(DRAFTS_KEY, draftId);
};

function saveEmailDraft(draft) {
  if (draft.id) return storageService.put(DRAFTS_KEY, draft);
  else {
    draft.isDraft = true;
    return storageService.post(DRAFTS_KEY, draft);
  }
};