import { ImageResponse } from "next/og";
import { products } from "@/data/products";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    // Return a default image if product not found
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            fontSize: 60,
            color: "black",
            background: "white",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Product Not Found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "white",
          background: "black",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 40,
        }}
      >
        <div style={{ 
          fontSize: 90, 
          fontWeight: "bold", 
          marginBottom: 30,
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
        }}>
          {product.name}
        </div>
        <div style={{ 
          fontSize: 40, 
          opacity: 0.8,
          maxWidth: "800px",
          textAlign: "center", 
        }}>
          {product.description?.slice(0, 100) || "Premium Hat Collection"}
          {product.description && product.description.length > 100 ? "..." : ""}
        </div>
        <div style={{ 
          position: "absolute", 
          bottom: 40, 
          fontSize: 30,
          opacity: 0.7, 
        }}>
          HAT STORE - PREMIUM COLLECTION
        </div>
      </div>
    ),
    { ...size }
  );
} 