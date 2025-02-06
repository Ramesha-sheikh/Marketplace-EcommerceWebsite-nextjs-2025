import { createClient } from "@sanity/client";

let sanityToken = process.env.SANITY_WRITE_TOKEN;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: sanityToken, // Initially set the token
  apiVersion: "2023-01-01",
});

// Function to refresh the token
export async function refreshSanityToken() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh-token`); // Replace with your refresh endpoint
    const data = await response.json();

    if (data.newToken) {
      sanityToken = data.newToken; // Update token
      console.log("Sanity Token Refreshed!");
    }
  } catch (error) {
    console.error("Failed to refresh Sanity token:", error);
  }
}

// import { createClient } from "@sanity/client";

// export const client = createClient({
//   projectId: "t7f44q1q", 
//   dataset: 'production',
//   apiVersion: "2023-01-01",
//   useCdn: false,
//   token: process.env.SANITY_WRITE_TOKEN, // ✅ Ensure token is set
// });
