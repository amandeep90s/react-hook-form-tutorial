import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YoutubeForm = () => {
  const form = useForm<FormValues>();
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

        <button type='submit'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
