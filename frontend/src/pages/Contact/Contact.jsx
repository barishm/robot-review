import { useSelector } from "react-redux";


const Contact = () => {
    const lang = useSelector((state) => state.language.lang);





  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-sm" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 pb-3 text-center">
              <div className="mb-md-3 mt-md-2 pb-3">
                <form action="https://formsubmit.co/barismassive@gmail.com" method="POST">
                  <h2 className="fw-bold mb-3">{lang === "en" ? <>Contact us</> : <>Свържете се с нас</>}</h2>
                  <div className="form-outline form-white mb-3">
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-control form-control-md"
                      placeholder={lang === "en" ? "Name" : "Име"}
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-control form-control-md"
                      placeholder={lang === "en" ? "Email" : "Имейл"}
                    />
                  </div>

                  <div className="form-outline form-white mb-3">
                    <textarea
                      type="text"
                      name="message"
                      required
                      className="form-control form-control-md"
                      placeholder={lang === "en" ? "Message" : "Съобщение"}
                      style={{ height: "180px" }}
                    />
                  </div>

                  <button
                    className="btn btn-outline-dark btn-md px-5 mt-2"
                    type="submit"
                  >
                    {lang === "en" ? "Submit" : "Изпращане"}
                  </button>
                  <input type="hidden" name="_captcha" value="false"></input>
                  <input type="hidden" name="_next" value="http://localhost:5173/contact"></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
