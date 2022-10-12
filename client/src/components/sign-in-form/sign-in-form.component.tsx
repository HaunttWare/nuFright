import React from "react";

const SignInForm = () => {
  
  const googleSignIn = () => {
    window.open("http://localhost:3000/api/auth/google", "_self");
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong text-black"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    aria-label="Email"
                    placeholder="Email"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    aria-label="Password"
                    placeholder="Password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                  />
                </div>

                <button className="btn btn-primary btn-lg w-100" type="submit">
                  Login
                </button>

                <hr className="my-4" />

                <button
                  className="btn btn-lg text-white btn-danger w-100"
                  onClick={googleSignIn}
                >
                  <i className="fab fa-google me-2"></i> Sign in with google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
