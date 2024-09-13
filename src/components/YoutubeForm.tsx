import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';

const YoutubeForm = () => {
  const form = useForm();
  const { register, control } = form;

  return (
    <div>
      <form>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' {...register('username')} />

        <label htmlFor='email'>E-mail</label>
        <input type='email' id='email' {...register('email')} />

        <label htmlFor='channel'>Channel</label>
        <input type='text' id='channel' {...register('channel')} />

        <button type='submit'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
