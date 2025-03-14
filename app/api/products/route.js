import apiClient from "../../lib/axios-client";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const filters = Object.fromEntries(searchParams.entries());

  console.log('filtes in route', filters)
  try {
    const queryString = new URLSearchParams(filters).toString();
    const { data } = await apiClient.get(`/products?${queryString}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
