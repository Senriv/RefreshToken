/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAddAssetMutation } from '../redux/asset/assetApiSlice';

const AddAssets = () => {
  const [addAsset, { error: ErrorMessageForm, isLoading }] =
    useAddAssetMutation();

  const initialValues = {
    name: '',
    description: '',
    file: null,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('file', values.file);

    try {
      await addAsset(formData).unwrap();
      resetForm();
    } catch (error) {
      console.log(
        ErrorMessageForm?.data?.message || 'Ошибка при загрузке файла'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h1>Add Asset</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field id="name" name="name" type="text" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <Field id="description" name="description" as="textarea" />
              <ErrorMessage name="description" component="div" />
            </div>
            <div>
              <label htmlFor="file">Asset's photo</label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={(event) => {
                  setFieldValue('file', event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="file" component="div" />
            </div>
            <button type="submit" disabled={isLoading}>
              Send
            </button>
          </Form>
        )}
      </Formik>
      <Link to="/welcome">Back to Welcome</Link>
    </section>
  );
};

export default AddAssets;
