import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YoutubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          {...register('username', { required: 'Username is required' })}
        />

        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          {...register('email', {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/,
              message: 'Invalid email format',
            },
          })}
        />

        <label htmlFor='channel'>Channel</label>
        <input
          type='text'
          id='channel'
          {...register('channel', {
            required: { value: true, message: 'Channel is required' },
          })}
        />

        <button type='submit'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
