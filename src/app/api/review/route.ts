import { Review } from "@/app/types/reviews";
import { client, refreshSanityToken } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Error ko specifically type karein
export async function POST(request: Request) {
  console.log("Sanity Token:", process.env.SANITY_WRITE_TOKEN ? "Available" : "Not Found");
  console.log("Sanity Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log("Sanity Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);

  try {
    const { productId, review } = (await request.json()) as {
      productId: string;
      review: Review;
    };

    if (!productId || !review) {
      return NextResponse.json({ message: "Invalid request data." }, { status: 400 });
    }

    const newReview = {
      ...review,
      date: new Date().toISOString(),
    };

    let updatedProduct;

    try {
      // Pehli dafa request bhej rahe hain
      updatedProduct = await client
        .patch(productId)
        .setIfMissing({ reviews: [] })
        .append("reviews", [newReview])
        .commit();
    } catch (error: unknown) { // Here, we specify the type as `unknown`
      console.error("Error during patch request:", error);

      if (error instanceof Error && error.message.includes("401")) { // Checking for specific error message or status
        console.warn("Token expired. Attempting to refresh...");

        // Refresh token karne ka attempt
        try {
          await refreshSanityToken(); // Refresh token ka function call karte hain
          console.log("Token refreshed successfully!");

          // Ab dobara request bhejna
          updatedProduct = await client
            .patch(productId)
            .setIfMissing({ reviews: [] })
            .append("reviews", [newReview])
            .commit();
        } catch (refreshError: unknown) { // Error type specified for refresh token
          console.error("Error refreshing token:", refreshError);
          return NextResponse.json(
            { message: "Failed to refresh token. Please try again later." },
            { status: 500 }
          );
        }
      } else {
        console.error("Non-token related error:", error);
        throw error; // Agar koi aur error hai to woh throw karein
      }
    }

    return NextResponse.json(
      { message: "Review submitted successfully!", updatedProduct },
      { status: 200 }
    );
  } catch (error: unknown) { // Handle error with specific type
    console.error("Error submitting review:", error);
    return NextResponse.json({ message: "Failed to submit review." }, { status: 500 });
  }
}


// import { Review } from "@/app/types/reviews";
// import { client, refreshSanityToken } from "@/sanity/lib/client";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   console.log("Sanity Token:", process.env.SANITY_WRITE_TOKEN ? "Available" : "Not Found");
//   console.log("Sanity Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
//   console.log("Sanity Dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);

//   try {
//     const { productId, review } = (await request.json()) as {
//       productId: string;
//       review: Review;
//     };

//     if (!productId || !review) {
//       return NextResponse.json({ message: "Invalid request data." }, { status: 400 });
//     }

//     const newReview = {
//       ...review,
//       date: new Date().toISOString(),
//     };

//     let updatedProduct;

//     try {
//       // Pehli dafa request bhej rahe hain
//       updatedProduct = await client
//         .patch(productId)
//         .setIfMissing({ reviews: [] })
//         .append("reviews", [newReview])
//         .commit();
//     } catch (error: any) {
//       console.error("Error during patch request:", error);
      
//       if (error.statusCode === 401) {
//         console.warn("Token expired. Attempting to refresh...");
        
//         // Refresh token karne ka attempt
//         try {
//           await refreshSanityToken(); // Refresh token ka function call karte hain
//           console.log("Token refreshed successfully!");
          
//           // Ab dobara request bhejna
//           updatedProduct = await client
//             .patch(productId)
//             .setIfMissing({ reviews: [] })
//             .append("reviews", [newReview])
//             .commit();
//         } catch (refreshError) {
//           console.error("Error refreshing token:", refreshError);
//           return NextResponse.json(
//             { message: "Failed to refresh token. Please try again later." },
//             { status: 500 }
//           );
//         }
//       } else {
//         console.error("Non-token related error:", error);
//         throw error; // Agar koi aur error hai to woh throw karein
//       }
//     }

//     return NextResponse.json(
//       { message: "Review submitted successfully!", updatedProduct },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error submitting review:", error);
//     return NextResponse.json({ message: "Failed to submit review." }, { status: 500 });
//   }
// }


