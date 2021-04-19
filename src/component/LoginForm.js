import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'

export function LoginForm() {

  return (
    <form>
      <h3>Sign In</h3>
      <br></br>

      <div className='form-group'>
        <label className='ml-3'>Email</label>
        <div className='input-group'>
          <div className='input-group-addon mt-2 mr-1'>
            <AiOutlineMail />
          </div>
          <input type='email' className='form-control' placeholder='Enter email' />
        </div>
      </div>

      <div className='form-group'>
        <label className='ml-3'>Password</label>
        <div className='input-group'>
          <div className='input-group-addon mt-2 mr-1'>
            <RiLockPasswordLine />
          </div>
          <input type='password' className='form-control' placeholder='Enter password' />
        </div>
      </div>

      <div className='form-group'>
          <div className='custom-control custom-checkbox'>
              <input type='checkbox' className='custom-control-input' id='customCheck1' />
              <label className='custom-control-label' htmlFor='customCheck1'>Remember me</label>
          </div>
      </div>

      <button type='submit' className='btn btn-primary btn-block'>Submit</button>
      <p className='forgot-password text-right'>
          Forgot <a href='#'>password?</a>
      </p>
  </form>
  );
}
