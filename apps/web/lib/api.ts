import type { ApiResponse } from "@paulas/types";

export interface SubmitOrderPayload {
  customerName: string;
  phoneNumber: string;
  cakeDescription: string;
  cakeImage: File | null;
  pickupDate: string;
  pickupTime: string;
}

export async function submitOrder(
  payload: SubmitOrderPayload
): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append("customerName", payload.customerName);
  formData.append("phoneNumber", payload.phoneNumber);
  formData.append("cakeDescription", payload.cakeDescription);
  formData.append("pickupDate", payload.pickupDate);
  formData.append("pickupTime", payload.pickupTime);

  if (payload.cakeImage) {
    formData.append("cakeImage", payload.cakeImage);
  }

  const response = await fetch("/api/orders", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit order");
  }

  return data;
}
