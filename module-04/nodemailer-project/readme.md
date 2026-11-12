This error is very common when using Nodemailer with Gmail. Don't worry — your Nodemailer code is probably correct. The problem is most likely related to Gmail authentication.

## 1. Why are you getting this error?

Your error says:

text

```text
535-5.7.8 Username and Password not accepted
code: 'EAUTH'
responseCode: 535
command: 'AUTH PLAIN'
```

This means:

- Nodemailer successfully reached Google's SMTP server.
- Gmail received your authentication request.
- Gmail rejected your username or password.

Authentication failedThe most common reason: You're using your normal Gmail password instead of a Google App Password.

Google generally does not allow regular Gmail passwords for this type of third-party SMTP authentication.

## 2. Solution: Generate a Google App Password

Follow these steps carefully.

### Step 1: Open your Google Account

Go to:

[Google Account Settings](https://myaccount.google.com/?utm_source=chatgpt.com)

Log in using the Gmail account you want to use for sending emails.

### Step 2: Enable 2-Step Verification

1. Open Security.
2. Find How you sign in to Google.
3. Open 2-Step Verification.
4. Enable it if it isn't already enabled.

SCORE Google Workspace: Enroll in 2-step verification - SCORE Support

[supportcenter.score.org](https://supportcenter.score.org/kb/article/683-score-google-workspace-enroll-in-2-step-verification/?utm_source=chatgpt.com)

### Step 3: Generate an App Password

After enabling 2-Step Verification, visit:

[Google App Passwords](https://myaccount.google.com/apppasswords?utm_source=chatgpt.com)

You may need to sign in again.

Enter an app name, for example:

text

```text
Nodemailer Project
```

Click Create.

Google will generate a 16-character app password.

[guides.stellaraio.com](https://guides.stellaraio.com/stellar/navigating-stellaraio/what-is-the-identities-tab/imap-overview?utm_source=chatgpt.com)

Important: Copy this generated password. Do not use your normal Gmail password.

### Step 4: Update your `.env` file

Replace your existing password with the newly generated App Password.

env

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

Google may display the password with spaces. Remove the spaces when putting it in `.env`.

### Step 5: Check your Nodemailer configuration

Your `index.js` should look like this:

javascript

```javascript
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server is ready!");
  }
});

// Send email
async function sendEmail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "receiver@gmail.com",
      subject: "Testing Nodemailer",
      text: "Hello! My Nodemailer is working.",
    });

    console.log("Email sent successfully!");
    console.log(info.response);
  } catch (error) {
    console.log("Email sending failed:", error);
  }
}

sendEmail();
```

### Step 6: Restart your Node.js application

Stop your existing server using:

bash

```bash
Ctrl + C
```

Then run:

bash

```bash
node index.js
```

Expected output:

text

```text
SMTP Server is ready!
Email sent successfully!
250 2.0.0 OK
```

## 3. If you still get the same error

Check these things:

| Possible issue                   | Solution                           |
| -------------------------------- | ---------------------------------- |
| Using normal Gmail password      | Use App Password                   |
| 2-Step Verification disabled     | Enable it                          |
| Wrong Gmail address              | Check `EMAIL_USER`                 |
| App Password copied incorrectly  | Generate a new one                 |
| Password contains spaces         | Remove spaces                      |
| Changed Google password recently | Generate a new App Password        |
| `.env` not loading               | Check `require("dotenv").config()` |

Google also restricts App Password availability for some accounts, including certain organization-managed accounts and accounts using Advanced Protection.

Gmail Help

+1

## 4. Important: Check your environment variables

If you want to make sure `.env` is loading correctly, temporarily add:

javascript

```javascript
console.log("Email:", process.env.EMAIL_USER);
console.log("Password exists:", !!process.env.EMAIL_PASS);
```

You should see:

text

```text
Email: your_email@gmail.com
Password exists: true
```

Never print the actual password or share it in screenshots.

## 5. If it still doesn't work, show me these three things

I can help identify the exact issue.

1. Your `index.js` Nodemailer configuration.
2. Your `.env` file with the actual email and password replaced by `XXXX`.
3. Tell me whether you generated a Google App Password or are using your normal Gmail password.

One important thing: Never share your real Gmail password or App Password here.

Official references:

- [Google – Sign in with App Passwords](https://support.google.com/mail/answer/185833?utm_source=chatgpt.com)
- [Nodemailer – Using Gmail](https://nodemailer.com/guides/using-gmail?utm_source=chatgpt.com)
