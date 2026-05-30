import { api } from "../../shared/api";

export const fetchHomeServiceTests = async () => {
  const response = await api.get("/home-service/tests");
  return response.data;
};