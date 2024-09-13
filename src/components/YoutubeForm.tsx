import { DevTool } from '@hookform/devtools';
import { useFieldArray, useForm } from 'react-hook-form';

type PhoneNumbers = {
  number: string;
};

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: PhoneNumbers[];
};

const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: 'Batman',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', ''],
      phNumbers: [{ number: '' }],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { append, fields, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };

  return (
    <div>
      <h2>Youtube Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
            <p className='error'>{errors.username.message}</p>
          )}
        </div>

        <div className='form-control'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/,
                message: 'Invalid email format',
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== 'admin@example.com' ||
                    'Enter a different email address'
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith('baddomain.com') ||
                    'This domain is not supported'
                  );
                },
              },
            })}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}
        </div>

        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input
            type='text'
            id='channel'
            {...register('channel', {
              required: { value: true, message: 'Channel is required' },
            })}
          />
          {errors.channel && <p className='error'>{errors.channel.message}</p>}
        </div>

        <div className='form-control'>
          <label htmlFor='twitter'>Twitter</label>
          <input
            type='text'
            id='twitter'
            {...register('social.twitter', {
              required: 'Twitter is required',
            })}
          />
          {errors.social?.twitter && (
            <p className='error'>{errors.social.twitter?.message}</p>
          )}
        </div>

        <div className='form-control'>
          <label htmlFor='facebook'>Facebook</label>
          <input
            type='text'
            id='facebook'
            {...register('social.facebook', {
              required: 'Facebook is required',
            })}
          />
          {errors.social?.facebook && (
            <p className='error'>{errors.social.facebook?.message}</p>
          )}
        </div>

        <div className='form-control'>
          <label htmlFor='primary-phone'>Primary phone number</label>
          <input
            type='text'
            id='primary-phone'
            {...register('phoneNumbers.0', {
              required: 'Primary phone number is required',
            })}
          />
          {errors.phoneNumbers?.[0] && (
            <p className='error'>{errors.phoneNumbers?.[0]?.message}</p>
          )}
        </div>

        <div className='form-control'>
          <label htmlFor='secondary-phone'>Secondary phone number</label>
          <input
            type='text'
            id='secondary-phone'
            {...register('phoneNumbers.1', {
              required: 'Secondary phone number is required',
            })}
          />
          {errors.phoneNumbers?.[1] && (
            <p className='error'>{errors.phoneNumbers?.[1]?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor=''>List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div key={field.id} className='form-control'>
                <input
                  type='text'
                  {...register(`phNumbers.${index}.number` as const, {
                    required: 'Phone number is required',
                  })}
                />
                {errors.phNumbers?.[index]?.number && (
                  <p className='error'>
                    {errors.phNumbers?.[index]?.number?.message}
                  </p>
                )}

                {index > 0 && (
                  <button
                    type='button'
                    style={{ marginTop: 15 }}
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type='button'
              style={{ marginBottom: 15 }}
              onClick={() => append({ number: '' })}
            >
              Add phone number
            </button>
          </div>
        </div>

        <button type='submit'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
