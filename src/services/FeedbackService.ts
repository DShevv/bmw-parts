import { FeedbackT, FeedbackResponse, OrderT, OrderResponseT } from "@/types/api";

export const postFeedback = async (data: FeedbackT) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/feedback`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
    const responseData: FeedbackResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {

    return {
      success: false,
      message: error,
    };
  }
};

export const postOrder = async (data: OrderT): Promise<OrderResponseT | { success: false, message: string }> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/orders`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
    const responseData: OrderResponseT = await response.json();

    if (!response.ok) {
      throw new Error("Ошибка при оформлении заказа");
    }

    return responseData;
  } catch (error) {

    return {
      success: false,
      message: error as string,
    };
  }
};


