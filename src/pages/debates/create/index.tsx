import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createDebate } from 'apiSdk/debates';
import { Error } from 'components/error';
import { debateValidationSchema } from 'validationSchema/debates';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { getOrganizations } from 'apiSdk/organizations';
import { getUsers } from 'apiSdk/users';
import { DebateInterface } from 'interfaces/debate';

function DebateCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DebateInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDebate(values);
      resetForm();
      router.push('/debates');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DebateInterface>({
    initialValues: {
      topic: '',
      organization_id: (router.query.organization_id as string) ?? null,
      debater_id: (router.query.debater_id as string) ?? null,
    },
    validationSchema: debateValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Debate
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="topic" mb="4" isInvalid={!!formik.errors?.topic}>
            <FormLabel>Topic</FormLabel>
            <Input type="text" name="topic" value={formik.values?.topic} onChange={formik.handleChange} />
            {formik.errors.topic && <FormErrorMessage>{formik.errors?.topic}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'debater_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'debate',
    operation: AccessOperationEnum.CREATE,
  }),
)(DebateCreatePage);
