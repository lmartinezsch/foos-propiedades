"use server";

import { google } from "googleapis";

export async function getSheetData() {
  let data;
  const glAuth = await google.auth.getClient({
    projectId: process.env.GA_SHEETS_PROJECT_ID,
    credentials: {
      type: process.env.GA_SHEETS_CREDENTIALS_TYPE,
      project_id: process.env.GA_SHEETS_CREDENTIALS_PROJECT_ID,
      private_key_id: process.env.GA_SHEETS_CREDENTIALS_PRIVATE_KEY_ID,
      private_key: process.env.GA_SHEETS_CREDENTIALS_PRIVATE_KEY,
      client_email: process.env.GA_SHEETS_CREDENTIALS_CLIENT_EMAIL,
      universe_domain: process.env.GA_SHEETS_CREDENTIALS_UNIVERSE_DOMAIN,
    },
    scopes: [process.env.GA_SHEETS_SCOPES || ""],
  });

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  try {
    data = await glSheets.spreadsheets.values.get({
      spreadsheetId: process.env.GA_SPREADSHIT_ID,
      range: "Propiedades!A:N",
    });
  } catch (e) {
    console.log(e);
  }

  return { data: data?.data.values };
}
