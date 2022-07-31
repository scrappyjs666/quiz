import axios from 'axios';

const crudId = `62e57b8a20afdf238d7d09b2`;

const instance = axios.create({
  baseURL: `https://${crudId}.mockapi.io/form`,
});

type Form = Record<string, string>;

export const postForm = (data: Form) => {
  return instance
    .post('/formInfo/', data)
    .then((resp) => resp.data)
    .catch((err) => err);
};
