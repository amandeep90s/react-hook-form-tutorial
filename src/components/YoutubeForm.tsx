import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
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
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

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

        <button type='submit'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
