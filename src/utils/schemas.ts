import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo obrigatório'
  }
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Informe um e-mail válido').required(),
  password: Yup.string().required()
});
