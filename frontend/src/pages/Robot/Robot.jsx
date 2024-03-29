import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RobotDetails from "./components/RobotDetails";
import QnA from "./components/QnA";
import {
  useGetRobotByIdQuery,
  useGetAllRobotsQuery,
  useLazyGetRobotByIdQuery,
} from "../../app/services/robotApiSlice";
import Loading from "../../components/Loading";
import { addRobot } from "../../app/redux/compareSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Robot = () => {
  const [Tab,setTab] = useState("Specs");
  const queryParams = {
    fields: "model",
  };
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);

  const [triggerCompare] = useLazyGetRobotByIdQuery();

  const { id } = useParams();
  const [Model, setModel] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetRobotByIdQuery({ id });
  const { data: allModels, isLoading: allModelsIsLoading } =
    useGetAllRobotsQuery(queryParams);
  const noImage = "../../../public/images/no-image.jpg";

  const compare = (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    const foundItem = allModels.content.find((item) => item.model === newModel);

    if (foundItem && foundItem.id !== data.id) {
      let id = data.id;
      triggerCompare({ id }).then((response) => {
        dispatch(addRobot(response.data));
      });
      id = foundItem.id;
      triggerCompare({ id }).then((response) => {
        dispatch(addRobot(response.data));
      });
      navigate("/compare");
    }
    setModel("");
  }
  const changeTab = (tabName) => {

    setTab(tabName);
  }


  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>
          <Loading />
        </>
      ) : data ? (
        <>
          <div className="container-md p-4 mt-4">
            <div className="row">
              <div className="col-12 shadow-sm rounded card p-5" style={{maxWidth:"900px",marginRight:"auto",marginLeft:"auto"}}>
                <div className="row">
                  <div className="col-12 col-md-4 mb-4">
                    <img
                      style={{ maxWidth: "100%", height: "auto" }}
                      src={data.image || noImage}
                    />
                  </div>
                  <div className="col-12 col-md-8 mt-2 p-4">
                    <h3 className="fw-border mb-3">{data.model}</h3>
                    <h6 className="ms-1 mb-2 mt-3">Brand: {data.brand}</h6>
                    <button
                      type="button"
                      style={{ marginTop: "20px", marginBottom: "10px" }}
                      className="btn btn-dark"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Compare
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning btn dropdown-toggle"
                      style={{
                        marginTop: "20px",
                        marginBottom: "10px",
                        marginLeft: "30px",
                      }}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {lang === "en" ? ("Check price") : ("Проверка на цена")}
                    </button>
                    <ul className="dropdown-menu">
                      {data.purchaseLinks &&
                        data.purchaseLinks.map((purchaseLink) => (
                          <li key={purchaseLink.id}>
                            <a
                              className="dropdown-item"
                              href={purchaseLink.link}
                            >
                              {purchaseLink.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                    <div className="collapse" id="collapseExample">
                      <input
                        className="form-control"
                        value={Model}
                        style={{ maxWidth: "241px" }}
                        name="Model"
                        list="datalistOptions"
                        id="Model"
                        onChange={compare}
                        placeholder="Choose robot from the list"
                      />
                      {allModelsIsLoading ? (
                        <>Loading...</>
                      ) : (
                        <>
                          <datalist id="datalistOptions">
                            {allModels.content.map((item) => (
                              <option key={item.id} value={item.model} />
                            ))}
                          </datalist>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a  className={`nav-link ${Tab === "Specs" ? "active" : ""}`} style={{color:"black"}} onClick={() => changeTab("Specs")} href="#">
                        Specs
                      </a>
                    </li>
                    <li class="nav-item">
                      <a value="Q&A" className={`nav-link ${Tab === "Q&A" ? "active" : ""}`} style={{color:"black"}} onClick={() => changeTab("Q&A")} href="#">
                        Q&A
                      </a>
                    </li>
                  </ul>
                  {Tab === "Specs" ? <RobotDetails robot={data} /> : <QnA Id={id} />}
                </div>
              </div>
              <div className="col-12">
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Robot;
