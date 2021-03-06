import { api } from "./api";

export const viewFirst = async () => {
  return await api.get(`/api/items/first`);
};

export const getItem = async (tokenId?: string) => {
  return await api.get(`/api/items/${tokenId}`);
};

export const getRelatedItem = async (tokenId?: string) => {
  return await api.get(`/api/items/relation/${tokenId}`);
};

export const getFeedbacks = async (tokenId?: string) => {
  return await api.get(`/api/feedbacks/${tokenId}`);
};

export const getFeedbacksFromMe = async (
  tokenId?: string,
  address?: string
) => {
  return await api.post(`/api/feedbacks/me`, { tokenId, address });
};

export const getIsLike = async (tokenId?: string, address?: string) => {
  return await api.get(`/api/items/like/${tokenId}/${address}`);
};

export const putLike = async (address: string, tokenId?: string) => {
  return await api.post(`/api/items/like`, { address, tokenId });
};

export const dislike = async (address: string, tokenId?: string) => {
  return await api.post(`/api/items/dislike`, { address, tokenId });
};

export const getProgressTx = async (address: string) => {
  return await api.get(`/api/items/mint/${address}`);
};

export const modifyTokenId = async (req: object) => {
  return await api.patch(`/api/items/mint`, req);
};

export const postFile = async (data: any) => {
  return await api.post(`/api/items/mint/upload`, data);
};

export const postMintBefore = async (data: Object) => {
  return await api.post(`/api/items/mint/before`, data);
};

export const putDownload = async (address: string, tokenId?: string) => {
  return await api.post(`/api/items/download`, { address, tokenId });
};

export const cancelItem = async (itemTrxHash: string) => {
  return await api.delete(`/api/items/cancel/${itemTrxHash}`);
};

export const viewList = async (
  pageNum: number,
  search: string,
  sort: number,
  type: string
) => {
  return await api.post(`/api/items/view`, { pageNum, search, sort, type });
};
// export const viewList = async (pageNum: number, sort: number, type: string) => {
//   return await api.post(`/api/items/view`, { pageNum, sort, type });
// };
