import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';


const EMAIL_STORAGE_KEY = "emailDB";
const EMAIL_DRAFTS_STORAGE_KEY = "emailDraftsDB";

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus"
};

const email = {
  id: 'e101',
  subject: 'Miss you!',
  body: 'Would love to catch up sometimes',
  isRead: false,
  sentAt: 1551133930594,
  to: 'momo@momo.com'
};

export const emailService = {
  query,
  remove,
  save,
  //   getById,
  getEmailsByFolder,
  // toggleReadEmail,
  toggleStarIcon,

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





function remove(emailId) {
  return storageService.remove(EMAIL_STORAGE_KEY, emailId);
};



function toggleStarIcon(email) {
  email.isStar = !email.isStar;
  return storageService.put(EMAIL_STORAGE_KEY, email);
};



function getEmailsByFolder(folder) {
  if (folder === "sent") {
    return query().then((emails) => {
      return emails.filter((email) => email.to === loggedinUser.email && !email.removedAt);
    });
  } else if (folder === "inbox")
    return query().then((emails) =>
      emails.filter((email) => email.to !== loggedinUser.email && !email.removedAt)
    );
  else if (folder === "star")
    return query().then((emails) =>
      emails.filter((email) => email.isStar && !email.removedAt)
    );
  else if (folder === "trash")
    return query().then((emails) => emails.filter((email) => email.removedAt));
  else if (folder === "draft") return storageService.query(emailDraftsDB);
};
