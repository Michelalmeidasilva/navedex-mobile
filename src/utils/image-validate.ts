export const validateImage = (url: string) => {
  const regex = '([a-z-_0-9/:.]*.(jpg|jpeg|png|gif))';

  return url.match(regex)
    ? url
    : 'https://www.lojasrede.com.br/arquivos/sem-foto.gif?v=635825126906770000';
};
