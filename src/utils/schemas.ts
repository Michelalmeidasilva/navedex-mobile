import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo obrigatório'
  }
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Informe um e-mail válido').required(),
  password: Yup.string().required().min(6, 'Senha deve ter mais que 6 caracteres')
});

export const NaverAddSchema = Yup.object().shape({
  name: Yup.string().required(),
  job_role: Yup.string().required(),
  // admission_date: Yup.date().required(),
  url: Yup.string(),
  project: Yup.string()
  // birthdate: Yup.date().required()
});
