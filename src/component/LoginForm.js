import { RiLockPasswordLine } from "react-icons/ri"
import { AiOutlineMail } from "react-icons/ai"

export function LoginForm() {

  return (
    <div className="border rounded bg-light">
      <form action="" className="mx-3 my-3">
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-addon mt-2 mr-1">
              <AiOutlineMail/>
            </div>
            <input type="email" placeholder="Email" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-addon mt-2 mr-1">
              <RiLockPasswordLine />
            </div>
            <input type="password" placeholder="Password" className="form-control" />
          </div>
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-primary">Log in</button>
        </div>
      </form>
    </div>
  );
}
