import * as yup from 'yup';

export const debateValidationSchema = yup.object().shape({
  topic: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  debater_id: yup.string().nullable().required(),
});
